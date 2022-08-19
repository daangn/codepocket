import * as Sandpack from '@codesandbox/sandpack-react';
import { Icon, IconButton, Modal } from '@shared/components';
import Transition from '@shared/utils/Transition';
import React, { useState } from 'react';

import useDeleteStory from '../../hooks/useDeleteStory';
import useUpdateStory from '../../hooks/useUpdateStory';
import getAllCodesFromSandpack from '../../utils/getAllCodesFromSandpack';
import * as style from './style.css';

interface StoryNameListProps {
  codeId: string;
  codeName: string;
  pocketCodes: { storyName: string; storyId: string }[];
  selectedStoryId?: string;
  selectStory: (storyName: string) => void;
}

interface StoryWantedDelete {
  modal: 'none' | 'delete' | 'update';
  storyId?: string;
}

const StoryNameList: React.FC<StoryNameListProps> = (props) => {
  const {
    sandpack: { files },
  } = Sandpack.useSandpack();
  const [storyWantedDelete, setStoryWantedDelete] = useState<StoryWantedDelete>({ modal: 'none' });
  const { deleteStory } = useDeleteStory({ onSuccessDelete: () => props.selectStory('') });
  const { updateStory } = useUpdateStory();

  const onClickDeleteBtn = (event: React.MouseEvent, storyId: string) => {
    event.stopPropagation();
    setStoryWantedDelete({ modal: 'delete', storyId });
  };
  const onClickUpdateBtn = (event: React.MouseEvent, storyId: string) => {
    event.stopPropagation();
    setStoryWantedDelete({ modal: 'update', storyId });
  };

  const closeModal = () => setStoryWantedDelete({ modal: 'none' });
  const onCancel = () => closeModal();
  const onConfirm = () => {
    const { storyId, modal } = storyWantedDelete;
    if (!storyId || modal === 'none') return;
    const [storyAuthor, storyName] =
      props.pocketCodes.find((c) => c.storyId === storyId)?.storyName.split('-') || '';

    if (modal === 'delete') deleteStory({ codeId: props.codeId, storyAuthor, storyName });
    else
      updateStory({ storyId, codes: getAllCodesFromSandpack({ files, codeName: props.codeName }) });
    closeModal();
  };

  return (
    <>
      <Modal isOpen={storyWantedDelete.modal !== 'none'} closeModal={closeModal}>
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
                  <IconButton
                    icon={<Icon icon="edit" />}
                    onClick={(event) => onClickUpdateBtn(event, storyId)}
                  />
                  <IconButton
                    icon={<Icon icon="delete" />}
                    onClick={(event) => onClickDeleteBtn(event, storyId)}
                  />
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
