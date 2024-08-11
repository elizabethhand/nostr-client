import { useEffect, useState } from "react";
import { SimplePool } from "nostr-tools";
import { Event } from "nostr-tools/lib/types/core";
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

  return <div className="App"> Hello!</div>;
};

export default App;
