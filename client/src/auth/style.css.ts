import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-40px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const wrapper = style([
  u.positionRelative,
  u.fullWidth,
  u.fullHeight,
  u.flexCenter,
  u.flexColumn,
  {
    rowGap: rem(20),
  },
]);

export const form = style([
  u.flexColumn,
  u.flexAlignCenter,
  u.positionRelative,
  {
    width: rem(350),
    height: rem(150),
    justifyContent: 'space-between',
  },
]);

export const titleWrapper = style([
  u.positionRelative,
  u.fullWidth,
  u.flexCenter,
  u.flexColumn,
  {
    rowGap: rem(5),
  },
]);

export const title = style([
  t.typography.heading2,
  {
    animation: `1.25s ${fadeIn}`,
  },
  m.small({
    fontSize: rem(40),
  }),
]);

export const subtitle = style([
  u.positionRelative,
  {
    color: colors.light.scheme.$gray900,
    fontSize: rem(17),
  },
  m.small({
    fontSize: rem(14),
  }),
]);

const shake = keyframes({
  '0%': { transform: 'translateX(-12px)' },
  '10%': { transform: 'translateX(12px)' },
  '20%': { transform: 'translateX(-10px)' },
  '30%': { transform: 'translateX(10px)' },
  '40%': { transform: 'translateX(-7px)' },
  '50%': { transform: 'translateX(7px)' },
  '60%': { transform: 'translateX(-4px)' },
  '70%': { transform: 'translateX(4px)' },
  '80%': { transform: 'translateX(-2px)' },
  '90%': { transform: 'translateX(2px)' },
  '100%': { transform: 'translateX(-1px)' },
});

export const input = recipe({
  base: [
    u.border,
    u.fullWidth,
    u.borderRadius2,
    {
      outline: 'none',
      height: rem(52),
      fontSize: rem(16),
      paddingLeft: rem(15),
      transition: 'all 0.3s ease',

      ':focus': {
        border: `1px solid ${colors.light.scheme.$blue800}`,
      },
    },
    m.small({
      width: '90vw',
    }),
  ],
  variants: {
    shake: {
      true: { animation: `1s ${shake}` },
    },
  },
});

export const button = style([
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
      backgroundColor: '#0A86B766',
    },
  },
  m.small({
    width: '90vw',
  }),
]);

export const error = style([
  u.positionRelative,
  {
    color: colors.light.scheme.$red800,
    height: rem(20),
  },
]);
