import { vars } from '@seed-design/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const buttonBase = style([
  u.fullWidth,
  u.borderNone,
  u.borderRadius2,
  {
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    fontSize: rem(18),
    height: rem(70),
    margin: rem(30),
    padding: rem(10),
    border: `1px solid ${vars.$static.color.staticWhite}`,
  },
]);

export const moreButton = style([
  buttonBase,
  u.cursorPointer,
  {
    backgroundColor: vars.$scale.color.blue100,
    color: vars.$scale.color.blue700,

    ':hover': {
      border: `1px solid ${vars.$scale.color.blue600}`,
      backgroundColor: vars.$scale.color.blue200,
    },
  },
]);

export const disableMoreButton = style([buttonBase, u.cursorNotAllowed]);
