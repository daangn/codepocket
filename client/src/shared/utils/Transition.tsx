import { useCallback, useEffect, useRef, useState } from 'react';

type StatusType = 'on' | 'off';
interface TransitionProps {
  children: (state: StatusType) => React.ReactNode;
  isOn?: boolean;
  timeout?: number;
}

function Transition({ children, isOn, timeout = 500 }: TransitionProps) {
  const closeTimerRef = useRef<NodeJS.Timeout>();
  const [status, setStatus] = useState<StatusType>(isOn ? 'on' : 'off');

  const onTransitionEnd = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setStatus('off');
    }, timeout);
  }, [setStatus, timeout]);

  useEffect(() => {
    if (!isOn) return onTransitionEnd();
    setStatus('on');

    return () => clearTimeout(closeTimerRef.current);
  }, [isOn, onTransitionEnd]);

  if (status === 'off') return <></>;
  return <>{children(status)}</>;
}

export default Transition;
