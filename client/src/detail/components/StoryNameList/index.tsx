import React from 'react';

import { PocketCode, StoryFullName } from '../../api';
import * as style from './style.css';

interface StoryNameListProps {
  pocketCodes: PocketCode[];
  selectedStoryName?: string;
  selectStory: (storyName: PocketCode) => void;
}

const getStoryNameFromPocketCode = (name: PocketCode) => name.split('_')[1] as StoryFullName;

const StoryNameList: React.FC<StoryNameListProps> = (props) => (
  <ul className={style.list}>
    {props.pocketCodes.map((name) => (
      <li key={name} className={style.item} onClick={() => props.selectStory(name)}>
        <button
          className={style.storyButton({
            selected: props.selectedStoryName === getStoryNameFromPocketCode(name),
          })}
        >
          {getStoryNameFromPocketCode(name)}
        </button>
      </li>
    ))}
  </ul>
);

export default StoryNameList;
