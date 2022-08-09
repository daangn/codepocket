import { colors } from '@karrotmarket/design-token';
import AsyncBoundary from '@shared/components/AsyncBoundary';
import Icon from '@shared/components/Icon';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import { PocketCode } from './api';
import Sandpack from './components/Sandpack';
import SandpackLoader from './components/SandpackLoader';
import StoryNameList from './components/StoryNameList';
import useCode from './hooks/useCode';
import useCreateStory from './hooks/useCreateStory';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';

const DetailPage: React.FC = () => {
  const { codeId } = useParams<keyof DetailPathParam>();
  const { data: codeDataRes } = useCode({ codeId });
  const { data: storyNamesRes } = useStoryNames({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
  });
  const { selectStory, selectedStory, selectedStoryName } = useStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
  });
  const { createStory } = useCreateStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
    selectStory,
  });

  if (!codeDataRes?.codeAuthor || !codeDataRes?.codeName) return <></>;
  return (
    <div className={style.wrapper}>
      <div className={style.codeBlock}>
        <header className={style.header}>
          <div className={style.headerIcon}>
            <Link to={pocketPath}>
              <Icon icon="leftChevron" color={colors.light.scheme.$blue800} />
            </Link>
          </div>
          <h1 className={style.title}>
            {codeDataRes?.codeAuthor}
            <span className={style.highlight}> / </span>
            {codeDataRes?.codeName}
          </h1>
        </header>
        <article className={style.article}>
          <AsyncBoundary pendingFallback={<SandpackLoader />} rejectedFallback={SandpackLoader}>
            <Sandpack
              code={codeDataRes?.code}
              codeName={codeDataRes?.codeName}
              codeAuthor={codeDataRes?.codeAuthor}
              selectedStory={selectedStory}
              pushCode={createStory}
            />
          </AsyncBoundary>
        </article>
        <StoryNameList
          pocketCodes={(storyNamesRes?.storyNames as PocketCode[]) || []}
          selectedStoryName={selectedStoryName}
          selectStory={selectStory}
        />
      </div>
    </div>
  );
};

export default DetailPage;
