import React from 'react';

import * as style from './style.css';

interface StoryNameListProps {
  pocketCodes: { storyName: string; storyId: string }[];
  selectedStoryId?: string;
  selectStory: (storyName: string) => void;
}

const StoryNameList: React.FC<StoryNameListProps> = (props) => (
  <ul className={style.list}>
    {props.pocketCodes.map(({ storyId, storyName }) => (
      <li key={storyId} className={style.item} onClick={() => props.selectStory(storyId)}>
        <button
          className={style.storyButton({
            selected: props.selectedStoryId === storyId,
          })}
        >
          {storyName}
        </button>
      </li>
    ))}
  </ul>
);

export default StoryNameList;
