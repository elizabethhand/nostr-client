import { useEffect, useRef, useState } from "react";
import { SimplePool, Event } from "nostr-tools";
import { Metadata } from "./types";
import NotesList from "./Components/NotesList/NotesList";
import HashtagsFilter from "./Components/HashtagsFilter/Hashtags";
import CreateNote from "./Components/CreateNote/CreateNote";
import "./App.scss";

export const RELAYS = ["wss://nostr-pub.wellorder.net", "wss://relay.damus.io"];

const App = () => {
  const [pool, setPool] = useState<SimplePool | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [metadata, setMetadata] = useState<Record<string, Metadata>>({});
  const [hashtags, setHashtags] = useState<string[]>([]);
  const metadataFetched = useRef<Record<string, boolean>>({});

  // setup relays pool
  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(RELAYS);
    };
  }, []);

  // subscribe to events
  useEffect(() => {
    if (!pool) return;

    setEvents([]);

    const sub = pool.subscribeMany(
      RELAYS,
      [
        {
          kinds: [1],
          limit: 100,
          "#t": hashtags.length > 0 ? hashtags : undefined,
        },
      ],
      {
        onevent(event: Event) {
          setEvents((events) => [...events, event]);
        },
        oneose() {
          sub.close();
        },
      }
    );

    return () => {};
  }, [pool, hashtags]);

  // get user data for events
  useEffect(() => {
    if (!pool) return;

    const pubKeysToFetch = events
      .filter((event) => metadataFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    pubKeysToFetch.forEach(
      (pubkey) => (metadataFetched.current[pubkey] = true)
    );

    const sub = pool.subscribeMany(
      RELAYS,
      [
        {
          kinds: [0],
          authors: pubKeysToFetch,
        },
      ],
      {
        onevent(event: Event) {
          const metadata = JSON.parse(event.content);
          setMetadata((cur) => ({
            ...cur,
            [event.pubkey]: metadata,
          }));
        },
        oneose() {
          sub.close();
        },
      }
    );
  }, [events, pool]);

  const removeLinks = (events: Event[]) => {
    return events.filter(
      (event) =>
        event.content.indexOf("https") === -1 &&
        event.content.indexOf("nostr:") === -1
    );
  };

  return (
    <div id="app">
      <h2>App</h2>
      <CreateNote pool={pool} />
      <HashtagsFilter hashtags={hashtags} onChange={setHashtags} />
      <NotesList notes={removeLinks(events)} metadata={metadata} />
    </div>
  );
};

export default App;
