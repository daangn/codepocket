import { vars } from '@seed-design/design-token';
import * as k from '@shared/styles/keyframes.css';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

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
    animation: `1.25s ${k.fadeInAndComeDown}`,
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
    backgroundColor: vars.$scale.color.blue500,
    color: 'white',
    fontWeight: 'bold',
    transition: 'background 0.2s ease',

    ':hover': {
      backgroundColor: vars.$scale.color.blue300,
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
