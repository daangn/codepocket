import { useCallback, useEffect, useRef, useState } from 'react';

type StatusType = 'on' | 'off';
interface TransitionProps {
  children: (state: StatusType) => React.ReactNode;
  isOn?: boolean;
  timeout?: number;
}

function Transition({ children, isOn, timeout = 500 }: TransitionProps) {
  const timerRef = useRef<NodeJS.Timeout>();
  const [status, setStatus] = useState<StatusType>(isOn ? 'on' : 'off');

  const onTransitionEnd = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setStatus('off');
    }, timeout);
  }, [setStatus, timeout]);

  const onTransitionStart = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setStatus('on');
    }, timeout);
  }, [setStatus, timeout]);

  useEffect(() => {
    if (!isOn) return onTransitionEnd();
    onTransitionStart();

    return () => clearTimeout(timerRef.current);
  }, [isOn, onTransitionEnd, onTransitionStart]);

  if (status === 'off') return <></>;
  return <>{children(status)}</>;
}

export default Transition;
