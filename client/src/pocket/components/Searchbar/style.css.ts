import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const container = recipe({
  base: [
    u.fullWidth,
    u.top0,
    u.borderRadius2,
    {
      position: 'sticky',
      marginTop: rem(30),
      zIndex: 10,
      transition: 'transform 0.5s ease, height 0.2s ease',
    },
  ],
  variants: {
    isScrollTop: {
      true: {
        transform: 'translateY(0)',
        height: rem(40),
      },
      false: {
        transform: `translateY(${rem(8)})`,
        border: `2px solid ${colors.light.scheme.$blue800}`,
        height: rem(45),
      },
    },
  },
});

export const searchbox = style([
  u.fullWidth,
  u.fullHeight,
  u.borderRadius2,
  u.borderNone,
  {
    padding: rem(10),
    paddingRight: rem(40),
    backgroundColor: colors.light.scheme.$gray100,
  },
]);

export const searchicon = style([
  u.right0,
  {
    width: rem(20),
    margin: rem(10),
    position: 'absolute',
  },
]);
