import "./NoteCard.scss";

type Props = {
  id: string;
  content: string;
};

const NoteCard = ({ id, content }: Props) => {
  return (
    <div id="note-card" key={id}>
      <div className="card-content">
        <div>{content}</div>
      </div>
    </div>
  );
};

export default NoteCard;
