import useTyping from '../../hooks/useTyping';
import * as style from './style.css';

interface SubTitleInterface {
  content: string;
  startDelay: number;
}

const SubTitle: React.FC<SubTitleInterface> = ({ content, startDelay }) => {
  const { text } = useTyping({
    content,
    startDelay,
  });

  return <h2 className={style.subtitle}>{text || ' '}</h2>;
};

export default SubTitle;
