import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const wrapper = style([
  u.positionAbsolute,
  u.flexColumn,
  {
    gap: rem(10),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
]);

export const title = style([t.typography.heading3]);

export const description = style({
  textAlign: 'center',
});

export const clipBoard = style([
  u.borderRadius,
  {
    padding: rem(5),
    backgroundColor: colors.light.scheme.$gray400,
  },
]);

export const codeItemButtonBase = style([
  u.borderRadius,
  u.cursorPointer,
  u.flex,
  u.flexAlignCenter,
  u.fullWidth,
  {
    height: rem(32),
    backgroundColor: 'white',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    justifyContent: 'space-evenly',
  },
]);

export const codeItemHeaderCopyButton = style([
  codeItemButtonBase,
  {
    border: `1px solid ${colors.light.scheme.$gray700}`,
    color: colors.light.scheme.$gray700,

    ':hover': {
      backgroundColor: colors.light.scheme.$gray100,
    },
  },
]);

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
      backgroundColor: '#0A86B766',
    },
  },
  m.small({
    width: '90vw',
  }),
]);
