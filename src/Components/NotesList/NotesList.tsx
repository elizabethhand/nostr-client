import { Event } from "nostr-tools/lib/types/core";
import { nip19 } from "nostr-tools";
import NoteCard from "../NoteCard/NoteCard";
import { Metadata } from "../../types";

type Props = {
  notes: Event[];
  metadata: Record<string, Metadata>;
};

const NotesList = ({ notes, metadata }: Props) => {
  return (
    <div id="note-list">
      {notes &&
        notes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              user={{
                name:
                  metadata[note.pubkey]?.name ??
                  `${nip19.npubEncode(note.pubkey).slice(0, 12)}...`,
                image:
                  metadata[note.pubkey]?.picture ??
                  `https://api.dicebear.com/5.x/identicon/svg?seed=${note.pubkey}`,
                pubkey: note.pubkey,
              }}
              createdAt={note.created_at}
              content={note.content}
              hashtags={note.tags.filter((t) => t[0] === "t").map((t) => t[1])}
            />
          );
        })}
    </div>
  );
};

export default NotesList;
