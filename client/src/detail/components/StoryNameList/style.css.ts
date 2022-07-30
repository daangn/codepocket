import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const list = style([
  u.flex,
  { gap: rem(20), margin: '0 auto', marginTop: rem(20), flexWrap: 'wrap' },
  m.medium({
    gap: rem(5),
  }),
]);

export const item = style([u.cursorPointer]);

export const storyButton = recipe({
  base: [
    u.borderRadius,
    u.cursorPointer,
    u.flexAlignCenter,
    {
      padding: `0 ${rem(10)}`,
      height: rem(32),
      fontSize: rem(18),
      border: `1px solid ${colors.light.scheme.$blue800}`,
      fontWeight: 'bold',
      transition: 'background 0.3s ease',
      justifyContent: 'space-evenly',

      ':hover': {
        backgroundColor: colors.light.scheme.$blue50,
      },
    },
  ],
  variants: {
    selected: {
      true: {
        color: colors.light.scheme.$white,
        backgroundColor: colors.light.scheme.$blue800,
      },
      false: {
        color: colors.light.scheme.$blue800,
        backgroundColor: colors.light.scheme.$white,
      },
    },
  },
});
