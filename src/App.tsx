import { useEffect, useState } from "react";
import { SimplePool } from "nostr-tools";
import { Event } from "nostr-tools/lib/types/core";
import NotesList from "./Components/NotesList/NotesList";
import "./App.scss";

export const RELAYS = ["wss://nostr-pub.wellorder.net", "wss://relay.damus.io"];

const App = () => {
  const [pool, setPool] = useState<SimplePool | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

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

    const sub = pool.subscribeMany(
      RELAYS,
      [
        {
          kinds: [1],
          limit: 100,
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
  }, [pool]);

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
      <NotesList notes={removeLinks(events)} />
    </div>
  );
};

export default App;
