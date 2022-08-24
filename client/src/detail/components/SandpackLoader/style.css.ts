import { vars } from '@seed-design/design-token';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { rem } from 'polished';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const skeletonContainer = style([
  u.flexCenter,
  u.flexColumn,
  {
    width: rem(1400),
    height: rem(600),
  },
]);

export const loader = style({
  border: '16px solid #f3f3f3',
  borderTop: `16px solid ${vars.$scale.color.blue700}`,
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  animation: `${rotate} 1s ease-in-out infinite`,
});

export const warning = style([t.mt12]);
