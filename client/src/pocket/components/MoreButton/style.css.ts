import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const buttonBase = style([
  u.fullWidth,
  u.borderNone,
  u.borderRadius2,
  {
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    fontSize: rem(18),
    height: rem(70),
    margin: rem(30),
    padding: rem(10),
    border: '1px solid white',
  },
]);

export const moreButton = style([
  buttonBase,
  u.cursorPointer,
  {
    backgroundColor: colors.light.scheme.$blue50,
    color: colors.light.scheme.$blue800,

    ':hover': {
      border: `1px solid ${colors.light.scheme.$blue800}`,
      backgroundColor: '#def8ff',
    },
  },
]);

export const disableMoreButton = style([buttonBase, u.cursorNotAllowed]);
