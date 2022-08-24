import { vars } from '@seed-design/design-token';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { rem } from 'polished';

const gradation = keyframes({
  '0%': { backgroundColor: vars.$scale.color.gray100 },
  '50%': { backgroundColor: vars.$scale.color.gray300 },
  '100%': { backgroundColor: vars.$scale.color.gray100 },
});

export const pendingFallback = style([
  u.fullWidth,
  u.flexCenter,
  u.borderRadius2,
  {
    height: rem(100),
    marginTop: rem(20),
    backgroundColor: vars.$scale.color.gray100,
    animation: `2s infinite ${gradation}`,
  },
]);
