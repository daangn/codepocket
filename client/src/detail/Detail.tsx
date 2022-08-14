import { colors } from '@karrotmarket/design-token';
import { Icon, Modal } from '@shared/components';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import Sandpack from './components/Sandpack';
import StoryNameList from './components/StoryNameList';
import useCode from './hooks/useCode';
import useCreateStory from './hooks/useCreateStory';
import useErrorModal from './hooks/useErrorModal';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';

// TODO: Suspense 적용하기
const DetailPage: React.FC = () => {
  const { codeId } = useParams<keyof DetailPathParam>();
  const { data: codeDataRes, error: getCodeError } = useCode({ codeId });
  const { data: storyNamesRes, error: getStoryNamesError } = useStoryNames({
    codeId: codeId || '',
  });
  const { selectStory, error: getStoryError, selectedStory, selectedStoryId } = useStory();
  const { createStory, error: createStoryError } = useCreateStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
    codeId: codeId || '',
    selectStory,
  });
  const { isModalOpened, closeModal } = useErrorModal({
    isError: !!getCodeError || !!getStoryNamesError || !!createStoryError || !!getStoryError,
  });

  return (
    <>
      <Modal closeModal={closeModal} isOpen={!!isModalOpened} disableEscape>
        <div className={style.modalContent}>
          <Icon icon="warningFill" color="red" />
          <div>{getCodeError?.response.data.message}</div>
          <div>{getStoryError?.response.data.message}</div>
          <div>{createStoryError?.response.data.message}</div>
          <div>{getStoryNamesError?.response.data.message}</div>
        </div>
      </Modal>
      <div className={style.wrapper}>
        <div className={style.codeBlock}>
          <header className={style.header}>
            <div className={style.headerIcon}>
              <Link to={pocketPath}>
                <Icon icon="leftChevron" color={colors.light.scheme.$blue800} />
              </Link>
            </div>
            <h1 className={style.title}>
              {!codeDataRes?.isAnonymous && codeDataRes?.codeAuthor}
              <span className={style.highlight}> / </span>
              {codeDataRes?.codeName}
            </h1>
          </header>
          <article className={style.article}>
            <Sandpack
              code={codeDataRes?.code || ''}
              codeName={codeDataRes?.codeName || ''}
              codeAuthor={codeDataRes?.codeAuthor || ''}
              selectedStory={selectedStory}
              pushCode={createStory}
            />
          </article>
          <StoryNameList
            pocketCodes={storyNamesRes?.storyNames || []}
            selectedStoryId={selectedStoryId}
            selectStory={selectStory}
          />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
