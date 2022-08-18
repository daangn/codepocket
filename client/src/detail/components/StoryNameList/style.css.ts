import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const scaleUp = keyframes({
  '0%': { top: rem(0), zIndex: -1 },
  '100%': { top: rem(-30), zIndex: -1 },
});
const scaleDown = keyframes({
  '0%': { top: rem(-30), zIndex: -1 },
  '100%': { top: rem(0), zIndex: -1 },
});

export const list = style([
  u.flex,
  { gap: rem(20), margin: '0 auto', marginTop: rem(35), flexWrap: 'wrap' },
  m.medium({
    gap: rem(5),
  }),
]);

export const item = style([u.cursorPointer, u.positionRelative]);

export const controlButtonsWrapper = recipe({
  base: [
    u.borderRadius,
    u.positionAbsolute,
    u.fullWidth,
    u.flex,
    { top: rem(-30), zIndex: 'auto' },
  ],
  variants: {
    selected: {
      true: { animation: `0.1s ${scaleUp}` },
      false: { animation: `0.1s ${scaleDown}` },
    },
  },
});

export const modifyButton = style([
  u.borderRadius,
  {
    width: '50%',
    height: rem(30),
    border: 'none',
    cursor: 'pointer',
  },
]);

export const deleteButton = style([
  u.borderRadius,
  {
    width: '50%',
    height: rem(30),
    backgroundColor: vars.$scale.color.red600,
    border: 'none',
    color: vars.$static.color.staticWhite,
    cursor: 'pointer',

    ':hover': { backgroundColor: vars.$scale.color.red400 },
  },
]);

export const storyButton = recipe({
  base: [
    u.borderRadius,
    u.cursorPointer,
    u.flexAlignCenter,
    {
      padding: `0 ${rem(10)}`,
      height: rem(32),
      fontSize: rem(18),
      border: `1px solid ${vars.$scale.color.blue500}`,
      fontWeight: 'bold',
      transition: 'background 0.3s ease',
      justifyContent: 'space-evenly',

      ':hover': {
        backgroundColor: vars.$scale.color.blue100,
      },
    },
  ],
  variants: {
    selected: {
      true: {
        color: vars.$static.color.staticWhite,
        backgroundColor: vars.$scale.color.blue500,
      },
      false: {
        color: vars.$scale.color.blue500,
        backgroundColor: vars.$static.color.staticWhite,
      },
    },
  },
});

/* modal */
export const modalParagraph = style([
  u.textAlignCenter,
  t.mb24,
  t.mt18,
  {
    fontSize: rem(20),
  },
]);

export const buttonWrapper = style([u.flex, { gap: rem(10) }]);
