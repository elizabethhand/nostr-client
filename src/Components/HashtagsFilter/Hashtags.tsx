import React, { Dispatch, SetStateAction, useState } from "react";
import "./Hashtags.scss";

type Props = {
  hashtags: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const HashtagsFilter = ({ hashtags, onChange }: Props) => {
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange([...hashtags, value]);
    setValue("");
  };

  const removeHashtag = (hashtag: string) => {
    onChange(hashtags.filter((item) => item !== hashtag));
  };

  return (
    <div id="hashtag-filter">
      <h2 className="title"> Filter hashtags</h2>
      <form className="form" onSubmit={onSubmit}>
        <textarea
          value={value}
          className="input"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={1}
        ></textarea>
        <button className="add-button">+ Add</button>
      </form>
      <div className="tag-container">
        {hashtags &&
          hashtags.map((hashtag) => {
            return (
              <div key={hashtag} className="tag">
                <div>{hashtag}</div>
                <div
                  className="remove-button"
                  onClick={() => removeHashtag(hashtag)}
                >
                  X
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HashtagsFilter;
