import throttle from 'lodash/throttle';
import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';
interface UseScrollDirection {
  threshold: number;
}

const useScrollDirection = (props: UseScrollDirection = { threshold: 10 }) => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>('up');
  const prevScrollY = useRef(0);

  const updateScrollDir = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    if (Math.abs(currentScrollY - prevScrollY.current) < props.threshold) return;

    setScrollDir(currentScrollY > prevScrollY.current ? 'down' : 'up');
    prevScrollY.current = currentScrollY;
  }, [props.threshold]);

  const onScroll = throttle(() => window.requestAnimationFrame(updateScrollDir), 100);

  useEffect(() => {
    prevScrollY.current = window.pageYOffset;

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { scrollDir };
};

export default useScrollDirection;
