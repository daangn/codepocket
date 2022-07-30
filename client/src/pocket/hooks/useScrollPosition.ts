import throttle from 'lodash/throttle';
import { useEffect, useMemo, useState } from 'react';

const THROTTLE_WAIT_MS = 100;

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const isScrollTop = useMemo(() => scrollPosition < 100, [scrollPosition]);

  useEffect(() => {
    const updatePosition = throttle(() => {
      setScrollPosition(window.pageYOffset);
    }, THROTTLE_WAIT_MS);

    window.addEventListener('scroll', updatePosition);
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return {
    isScrollTop,
    scrollPosition,
  };
};

export default useScrollPosition;
