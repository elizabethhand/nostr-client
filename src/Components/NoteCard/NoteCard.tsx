import "./NoteCard.scss";

type Props = {
  id: string;
  content: string;
  hashtags: string[];
};

const NoteCard = ({ id, content, hashtags }: Props) => {
  return (
    <div id="note-card" key={id}>
      <div className="card-content">
        <div>{content}</div>
      </div>
      {hashtags.length > 0 && (
        <div className="tag-container">
          {hashtags.map((hashtag, i) => {
            return (
              <div
                key={`${hashtag}_${id.slice(0, 5)}${i}`}
                className="tag"
              >{`#${hashtag}`}</div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
