import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';
interface UseScrollDirection {
  threshold: number;
}

const useScrollDirection = (props: UseScrollDirection = { threshold: 10 }) => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < props.threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir, props.threshold]);

  return { scrollDir };
};

export default useScrollDirection;
