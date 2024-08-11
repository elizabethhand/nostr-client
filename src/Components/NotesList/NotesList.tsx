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
          return <NoteCard key={note.id} id={note.id} content={note.content} />;
        })}
    </div>
  );
};

export default NotesList;
