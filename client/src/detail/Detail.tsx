import * as Sandpack from '@codesandbox/sandpack-react';
import * as theme from '@codesandbox/sandpack-themes';
import { colors } from '@karrotmarket/design-token';
import { Icon, Modal } from '@shared/components';
import useModal from '@shared/hooks/useModal';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import SandpackComponent from './components/Sandpack';
import StoryNameList from './components/StoryNameList';
import useCode from './hooks/useCode';
import useCreateStory from './hooks/useCreateStory';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';
import { createObjWithCertainValue } from './utils/filterObj';
import { getDependenciesFromText } from './utils/parse';
import { genrateBaseCode } from './utils/textGenerator';

// TODO: Suspense 적용하기
const DetailPage: React.FC = () => {
  const { codeId } = useParams<keyof DetailPathParam>();
  const { data: codeDataRes, error: getCodeError } = useCode({ codeId });
  const { data: storyNamesRes, error: getStoryNamesError } = useStoryNames({
    codeId: codeId || '',
  });
  const { selectStory, error: getStoryError, selectedStoryCodes, selectedStoryId } = useStory();
  const { createStory, error: createStoryError } = useCreateStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
    codeId: codeId || '',
    selectStory,
  });
  const { isModalOpened, closeModal } = useModal({
    isOpened: !!getCodeError || !!getStoryNamesError || !!createStoryError || !!getStoryError,
  });

  const ROOT_FILE = '/App.tsx';
  const VERSION = 'latest';
  const dependencies = createObjWithCertainValue(
    getDependenciesFromText(codeDataRes?.code || ''),
    VERSION,
  );
  const files = {
    [ROOT_FILE]: genrateBaseCode(codeDataRes?.codeName || ''),
    [`/${codeDataRes?.codeName}`]: codeDataRes?.code || '',
    ...selectedStoryCodes?.codes,
  };

  return (
    <>
      <Modal closeModal={closeModal} isOpen={!!isModalOpened} disableEscape>
        <div className={style.modalContent}>
          <Icon icon="warningFill" color="red" />
          <div>올바르지 않은 요청이 발생했어요(한번 더 확인해주세요)</div>
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
          <Sandpack.SandpackProvider
            theme={theme.aquaBlue}
            template="react-ts"
            customSetup={{ dependencies }}
            files={files}
          >
            <article className={style.article}>
              <SandpackComponent
                code={codeDataRes?.code || ''}
                codeName={codeDataRes?.codeName || ''}
                codeAuthor={codeDataRes?.codeAuthor || ''}
                selectedStoryCodes={selectedStoryCodes}
                pushCode={createStory}
              />
            </article>
            <StoryNameList
              codeId={codeId || ''}
              codeName={codeDataRes?.codeName || ''}
              pocketCodes={storyNamesRes?.storyNames || []}
              selectedStoryId={selectedStoryId}
              selectStory={selectStory}
            />
          </Sandpack.SandpackProvider>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
