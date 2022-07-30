import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { rem } from 'polished';

const gradation = keyframes({
  '0%': { backgroundColor: colors.light.scheme.$gray100 },
  '50%': { backgroundColor: colors.light.scheme.$gray300 },
  '100%': { backgroundColor: colors.light.scheme.$gray100 },
});

export const pendingFallback = style([
  u.fullWidth,
  u.flexCenter,
  u.borderRadius2,
  {
    height: rem(100),
    marginTop: rem(20),
    backgroundColor: colors.light.scheme.$gray100,
    animation: `2s infinite ${gradation}`,
  },
]);
