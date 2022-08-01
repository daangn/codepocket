import to from 'await-to-js';
import { useCallback, useState } from 'react';

interface UseClipboardParameters {
  text: string;
}

const useClipboard = ({ text }: UseClipboardParameters) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async () => {
    const [error] = await to(navigator.clipboard.writeText(text));
    if (error) return setIsCopied(false);

    setIsCopied(true);
    return setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [text]);

  return { isCopied, copyToClipboard };
};

export default useClipboard;
