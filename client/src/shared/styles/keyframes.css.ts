import { vars } from '@seed-design/design-token';
import { keyframes } from '@vanilla-extract/css';
import { rem } from 'polished';

export const fadeIn = (to: number) =>
  keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: to },
  });

export const fadeOut = (from: number) =>
  keyframes({
    '0%': { opacity: from },
    '100%': { opacity: 0 },
  });

export const fadeInAndComeDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-40px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const jumpUp = keyframes({
  '0%': { top: rem(0), zIndex: -1 },
  '100%': { top: rem(-30), zIndex: -1 },
});

export const sinkDown = keyframes({
  '0%': { top: rem(-30), zIndex: -1 },
  '100%': { top: rem(0), zIndex: -1 },
});

export const scaleUp = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});

export const scaleDown = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
});

export const gradation = keyframes({
  '0%': { backgroundColor: vars.$scale.color.gray100 },
  '50%': { backgroundColor: vars.$scale.color.gray300 },
  '100%': { backgroundColor: vars.$scale.color.gray100 },
});
