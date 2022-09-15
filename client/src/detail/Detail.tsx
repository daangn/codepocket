import * as Sandpack from '@codesandbox/sandpack-react';
import * as theme from '@codesandbox/sandpack-themes';
import { vars } from '@seed-design/design-token';
import { Icon } from '@shared/components';
import { useModalDispatch } from '@shared/contexts/ModalContext';
import useCode from '@shared/hooks/useCode';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import ErrorModal from './components/ErrorModal';
import SandpackComponent from './components/Sandpack';
import StoryNameList from './components/StoryNameList';
import useCreateStory from './hooks/useCreateStory';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';
import { createObjWithCertainValue } from './utils/filterObj';
import { checkWordInArray, getDependenciesFromText } from './utils/parse';
import { genrateBaseCode } from './utils/textGenerator';

// TODO: Suspense 적용하기
const DetailPage: React.FC = () => {
  const { codeId } = useParams<keyof DetailPathParam>();
  const modalDispatch = useModalDispatch();
  const onError = () => modalDispatch({ type: 'OPEN_MODAL', Component: ErrorModal });
  const { data: codeDataRes } = useCode({ codeId, onError });
  const { data: storyNamesRes } = useStoryNames({
    codeId: codeId || '',
    onError,
  });
  const { selectStory, selectedStoryCodes, selectedStoryId } = useStory({ onError });
  const { createStory } = useCreateStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
    codeId: codeId || '',
    selectStory,
    onError,
  });

  const ROOT_FILE = '/App.tsx';
  const VERSION = 'latest';
  const dependencies =
    codeDataRes && checkWordInArray(codeDataRes.codeName, ['js', 'jsx', 'ts', 'tsx'])
      ? createObjWithCertainValue(getDependenciesFromText(codeDataRes.code || ''), VERSION)
      : createObjWithCertainValue(getDependenciesFromText(codeDataRes?.code || ''), VERSION);
  const files = {
    [ROOT_FILE]: genrateBaseCode(codeDataRes?.codeName || ''),
    [`/${codeDataRes?.codeName}`]: codeDataRes?.code || '',
    ...selectedStoryCodes?.codes,
  };

  return (
    <div className={style.wrapper}>
      <div className={style.codeBlock}>
        <header className={style.header}>
          <div className={style.headerIcon}>
            <Link to={pocketPath}>
              <Icon icon="leftChevron" color={vars.$scale.color.blue800} />
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
  );
};

export default DetailPage;
