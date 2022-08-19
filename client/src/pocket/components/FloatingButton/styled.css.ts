import { vars } from '@seed-design/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const floatingButton = recipe({
  base: [
    u.cursorPointer,
    u.fullHeight,
    u.fullWidth,
    {
      border: 'none',
      fontSize: rem(50),
      borderRadius: '50%',
      color: vars.$static.color.staticWhite,
      backgroundColor: vars.$scale.color.blue600,
      transition: 'all 0.3s',
    },
  ],
  variants: {
    selected: {
      true: {
        transform: 'rotate(315deg)',
        ':active': {
          transform: 'rotate(345deg) scale(1.05)',
        },
      },
      false: {
        transform: 'rotate(0deg)',
        ':active': {
          transform: 'rotate(-30deg) scale(1.05)',
        },
      },
    },
  },
});

export const wrapper = style([
  u.positionAbsolute,
  u.flexCenter,
  {
    width: rem(70),
    height: rem(70),
    right: rem(50),
    bottom: rem(50),
    borderRadius: '50%',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',

    // selectors: {
    //   '& button:nth-child(n)': {
    //     width: rem(80),
    //     height: rem(80),
    //     fontSize: rem(55),
    //   },
    // },
  },
]);
