// @ts-nocheck TODO: 스토리 로컬스토리지 기능 개선 후 제거하기
import { colors } from '@karrotmarket/design-token';
import AsyncBoundary from '@shared/components/AsyncBoundary';
import Icon from '@shared/components/Icon';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import { PocketCode } from './api';
import Sandpack from './components/Sandpack';
import SandpackLoader from './components/SandpackLoader';
import StoryNameList from './components/StoryNameList';
import useCreateStory from './hooks/useCreateStory';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';

const DetailPage: React.FC = () => {
  const { codeAuthor, codeName } = useParams<keyof DetailPathParam>();
  const { data: storyNamesRes } = useStoryNames({ codeAuthor, codeName });
  const { selectStory, selectedStory, selectedStoryName } = useStory({ codeAuthor, codeName });
  const { createStory } = useCreateStory({ codeAuthor, codeName, selectStory });

  if (!codeAuthor || !codeName) return <></>;
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
            {codeAuthor}
            <span className={style.highlight}> / </span>
            {codeName}
          </h1>
        </header>
        <article className={style.article}>
          <AsyncBoundary pendingFallback={<SandpackLoader />} rejectedFallback={SandpackLoader}>
            <Sandpack
              codeName={codeName}
              codeAuthor={codeAuthor}
              selectedStory={selectedStory}
              pushCode={createStory}
            />
          </AsyncBoundary>
        </article>
        {/* TODO: 로컬스토리지에서 username받아오는게 token으로 바껴서 로직 수정 필요 */}
        {/* <StoryNameList
          pocketCodes={(storyNamesRes?.storyNames as PocketCode[]) || []}
          selectedStoryName={selectedStoryName}
          selectStory={selectStory}
        /> */}
      </div>
    </div>
  );
};

export default DetailPage;
