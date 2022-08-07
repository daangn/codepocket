import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const wrapper = style([
  u.positionAbsolute,
  u.flexColumn,
  {
    width: rem(500),
    gap: rem(10),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  m.medium({
    width: rem(360),
  }),
  m.small({
    width: '88vw',
  }),
]);

export const title = style([t.typography.heading4]);

export const description = style([
  t.typography.caption1,
  {
    color: colors.light.scheme.$gray700,
  },
]);

export const clipBoardText = style([t.typography.body2, { fontWeight: 'bold' }]);
export const clipBoardIconBox = style({ paddingTop: rem(4) });
export const clipBoardContainer = recipe({
  base: [
    u.borderRadius2,
    u.flex,
    u.flexAlignCenter,
    u.cursorPointer,
    {
      border: 'none',
      padding: rem(10),
      height: rem(52),
      backgroundColor: colors.light.scheme.$gray100,
      justifyContent: 'space-between',
      transition: 'background 0.2s ease, border 0.2s ease',

      ':hover': {
        backgroundColor: colors.light.scheme.$gray400,
      },
    },
  ],
  variants: {
    isCopied: {
      true: { border: `${rem(2)} solid ${colors.light.scheme.$blue800}` },
      false: { border: `${rem(2)} solid white` },
    },
  },
});

export const linkButton = style([
  u.fullWidth,
  u.borderNone,
  u.borderRadius2,
  u.cursorPointer,
  {
    height: rem(52),
    fontSize: rem(16),
    backgroundColor: colors.light.scheme.$blue800,
    color: 'white',
    fontWeight: 'bold',
    transition: 'background 0.2s ease',

    ':hover': {
      backgroundColor: '#0A86B799',
    },
  },
]);
