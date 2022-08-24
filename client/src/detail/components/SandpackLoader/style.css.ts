import { colors } from '@karrotmarket/design-token';
import * as k from '@shared/styles/keyframes.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

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
  borderTop: `16px solid ${colors.light.scheme.$blue800}`,
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  animation: `${k.rotate} 1s ease-in-out infinite`,
});

export const warning = style([t.mt12]);
