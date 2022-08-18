import { Modal } from '@shared/components';
import Transition from '@shared/utils/Transition';
import React, { useState } from 'react';

import useDeleteStory from '../../hooks/useDeleteStory';
import * as style from './style.css';

interface StoryNameListProps {
  codeId: string;
  pocketCodes: { storyName: string; storyId: string }[];
  selectedStoryId?: string;
  selectStory: (storyName: string) => void;
}

const StoryNameList: React.FC<StoryNameListProps> = (props) => {
  const [storyWantedDelete, setStoryWantedDelete] = useState('');
  const { deleteStory } = useDeleteStory({ onSuccessDelete: () => props.selectStory('') });

  const onClickDeleteBtn = (event: React.MouseEvent, storyFullName: string) => {
    event.stopPropagation();
    setStoryWantedDelete(storyFullName);
  };

  const closeModal = () => setStoryWantedDelete('');
  const onCancel = () => closeModal();
  const onConfirm = () => {
    const [storyAuthor, storyName] = storyWantedDelete.split('-');
    deleteStory({ codeId: props.codeId, storyAuthor, storyName });
    closeModal();
  };

  return (
    <>
      <Modal isOpen={!!storyWantedDelete} closeModal={closeModal}>
        <p className={style.modalParagraph}>정말로 스토리를 삭제하시겠어요?</p>
        <div className={style.buttonWrapper}>
          <Modal.CancelButton onCancel={onCancel} />
          <Modal.ConfirmButton onConfirm={onConfirm} />
        </div>
      </Modal>
      <ul className={style.list}>
        {props.pocketCodes.map(({ storyId, storyName }) => (
          <li key={storyId} className={style.item} onClick={() => props.selectStory(storyId)}>
            <Transition isOn={props.selectedStoryId === storyId} timeout={100}>
              {() => (
                <div
                  className={style.controlButtonsWrapper({
                    selected: props.selectedStoryId === storyId,
                  })}
                >
                  <button className={style.modifyButton}>수정</button>
                  <button
                    className={style.deleteButton}
                    onClick={(event) => onClickDeleteBtn(event, storyName)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </Transition>
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
    </>
  );
};

export default StoryNameList;
