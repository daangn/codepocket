import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
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

export const buttonWrapper = style([
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

export const modalContent = style([
  u.flexColumn,
  {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: rem(10),
    height: rem(100),
    fontSize: rem(18),
  },
]);
