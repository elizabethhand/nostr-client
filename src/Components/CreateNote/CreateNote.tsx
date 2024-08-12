import React, { useState } from "react";
import { finalizeEvent, verifyEvent, getPublicKey } from "nostr-tools/pure";
import type { SimplePool, Event } from "nostr-tools";
import { RELAYS } from "../../App";
import { bech32Decoder } from "../../utils";
import "./CreateNote.scss";

type Props = {
  pool: SimplePool | null;
};

const CreateNote = ({ pool }: Props) => {
  const [input, setInput] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const baseEvent = {
      content: input,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [],
    };

    try {
      let isGood = false;
      let clearedInput = false;
      let eventToSend: Event | undefined;

      if (window.nostr) {
        await window.nostr
          .signEvent(baseEvent)
          .then(async (eventFinal: Event) => {
            eventToSend = eventFinal;
          });
      } else {
        const key = window.prompt("Please enter your key");
        const skDecoded = bech32Decoder("nsec", String(key));
        const pk = getPublicKey(skDecoded);
        const event = {
          ...baseEvent,
          pubkey: pk,
        };
        eventToSend = finalizeEvent(event, skDecoded);
      }

      isGood = verifyEvent(eventToSend as Event);

      if (isGood && eventToSend && pool) {
        if (clearedInput) return;
        pool.publish(RELAYS, eventToSend);
        clearedInput = true;
        setInput("");
      } else {
        throw Error("Failed to publish event. Invalid event or pool provided.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="create-note">
      <h2 className="title"> Whats On Your Mind??</h2>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Write your note here..."
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <div className="button-container">
          <button className="button">Publish</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
