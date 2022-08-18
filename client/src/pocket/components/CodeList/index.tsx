import { GetCodesResponse } from '@codepocket/schema';

import Codeblock from '../Codeblock';
import * as style from './style.css';

const CodeList: React.FC<{ codes: GetCodesResponse['codes'] }> = ({ codes }) => {
  return (
    <ul className={style.codeList}>
      {codes.map(({ userId, codeId, code, codeAuthor, codeName, isAnonymous }) => (
        <Codeblock
          key={`${codeAuthor}${codeName}`}
          userId={userId}
          codeId={codeId}
          codeAuthor={codeAuthor}
          code={code}
          codeName={codeName}
          isAnonymous={isAnonymous}
        />
      ))}
    </ul>
  );
};

export default CodeList;
