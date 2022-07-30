import { CodeType } from '../../api';
import Codeblock from '../Codeblock';
import * as style from './style.css';

interface CodeListInterface {
  codes: CodeType[];
}

const CodeList: React.FC<CodeListInterface> = ({ codes }) => {
  return (
    <ul className={style.codeList}>
      {codes.map(({ code, codeAuthor, codeName }) => (
        <Codeblock
          key={`${codeAuthor}${codeName}`}
          codeAuthor={codeAuthor}
          code={code}
          codeName={codeName}
        />
      ))}
    </ul>
  );
};

export default CodeList;
