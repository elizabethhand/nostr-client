import { Event } from "nostr-tools/lib/types/core";
import NoteCard from "../NoteCard/NoteCard";

type Props = {
  notes: Event[];
};

const NotesList = ({ notes }: Props) => {
  return (
    <div id="note-list">
      {notes &&
        notes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              content={note.content}
              hashtags={note.tags.filter((t) => t[0] === "t").map((t) => t[1])}
            />
          );
        })}
    </div>
  );
};

export default NotesList;
