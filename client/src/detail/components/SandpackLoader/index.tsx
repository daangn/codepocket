// deprecated : 원하면 삭제해도 됌
import Icon from '@shared/components/Icon';

import * as style from './style.css';

interface SandpackLoaderProps {
  resetErrorBoundary?: (...args: Array<unknown>) => void;
}

const SandpackLoader: React.FC<SandpackLoaderProps> = (props) => (
  <div className={style.skeletonContainer}>
    {props.resetErrorBoundary ? (
      <>
        <Icon icon="information" />
        <span className={style.warning}>코드를 불러올 수 없어요!</span>
      </>
    ) : (
      <div className={style.loader} />
    )}
  </div>
);

export default SandpackLoader;
