/* eslint-disable no-await-in-loop */
import { useCallback, useEffect, useState } from 'react';

interface TypingHookProps {
  content: string;
  startDelay?: number;
}

function sleep(t: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
}

function useTyping({ content, startDelay = 0 }: TypingHookProps) {
  const [text, setText] = useState<string>('');
  const [isTypingEnd, setIsTypingEnd] = useState<boolean>(true);

  const addText = useCallback(
    (text: string) => `${text.slice(0, text.length - 1) + content[text.length - 1]}|`,
    [content],
  );

  useEffect(() => {
    if (isTypingEnd) return;
    (async () => {
      await sleep(70);
      if (text.length === content.length + 1) return setIsTypingEnd(true);
      return setText((text) => addText(text));
    })();
  }, [content, text, isTypingEnd, addText]);

  useEffect(() => {
    (async () => {
      await sleep(startDelay);
      setIsTypingEnd(false);
      setText('|');
    })();
  }, [content, startDelay]);

  return { text, isTypingEnd };
}

export default useTyping;
