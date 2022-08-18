import { vars } from '@seed-design/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const iconButton = style([
  u.flexCenter,
  u.cursorPointer,
  {
    background: 'none',
    border: `1px solid ${vars.$scale.color.gray300}`,
    borderRadius: rem(10),
    transition: 'background 0.2s ease',

    ':hover': {
      backgroundColor: vars.$scale.color.gray200,
    },
  },
]);
