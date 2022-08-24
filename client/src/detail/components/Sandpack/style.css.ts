import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const storyCreatingForm = style([
  u.flex,
  t.mt18,
  { gap: rem(12), justifyContent: 'right' },
  m.small({
    flexDirection: 'column',
  }),
]);

export const sandpackWrapper = style([
  {
    height: rem(600),
  },
  m.medium({
    height: 'auto',
  }),
]);

export const submitButton = recipe({
  base: [
    u.borderNone,
    u.borderRadius2,
    u.cursorPointer,
    {
      width: rem(150),
      height: rem(52),
      fontSize: rem(16),
      display: 'block',
      color: vars.$static.color.staticWhite,
      transition: 'background 0.2s ease',

      ':hover': {
        backgroundColor: vars.$scale.color.blue400,
      },
    },
    m.small({
      width: '100%',
    }),
  ],
  variants: {
    enable: {
      true: {
        backgroundColor: vars.$scale.color.blue500,
      },
      false: {
        cursor: 'not-allowed',
        backgroundColor: vars.$scale.color.blue300,
      },
    },
  },
});

export const storyNameInput = recipe({
  base: [
    u.border,
    u.borderRadius2,
    {
      outline: 'none',
      width: rem(200),
      height: rem(52),
      fontSize: rem(16),
      paddingLeft: rem(15),
    },
    m.small({
      width: '100%',
    }),
  ],
  variants: {
    enable: {
      true: {
        backgroundColor: vars.$static.color.staticWhite,
      },
      false: {
        cursor: 'not-allowed',
        backgroundColor: vars.$scale.color.gray100,
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
