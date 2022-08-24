import { colors } from '@karrotmarket/design-token';
import * as k from '@shared/styles/keyframes.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const pendingFallback = style([
  u.fullWidth,
  u.flexCenter,
  u.borderRadius2,
  {
    height: rem(100),
    marginTop: rem(20),
    backgroundColor: colors.light.scheme.$gray100,
    animation: `2s infinite ${k.gradation}`,
  },
]);
