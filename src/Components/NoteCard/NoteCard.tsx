import "./NoteCard.scss";

type Props = {
  id: string;
  user: {
    name: string;
    image: string;
    pubkey: string;
  };
  createdAt: number;
  content: string;
  hashtags: string[];
};

const NoteCard = ({ id, user, createdAt, content, hashtags }: Props) => {
  return (
    <div id="note-card" key={id}>
      <div className="card-metadata">
        <div className="left">
          <img className="image" src={user.image} />
        </div>
        <div className="right">
          <div className="username"> {user.name}</div>
          <div className="date">
            {new Date(createdAt * 1000).toISOString().split("T")[0]}
          </div>
        </div>
      </div>
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
