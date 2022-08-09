import { GetCodesResponse } from '@pocket/schema';

import Codeblock from '../Codeblock';
import * as style from './style.css';

const CodeList: React.FC<{ codes: GetCodesResponse['codes'] }> = ({ codes }) => {
  return (
    <ul className={style.codeList}>
      {codes.map(({ code, codeAuthor, codeName, isAnonymous }) => (
        <Codeblock
          key={`${codeAuthor}${codeName}`}
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
