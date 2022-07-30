import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const searchHelpTextBox = style([
  u.fullWidth,
  {
    margin: rem(10),
    fontSize: rem(14),
  },
]);

export const searchText = style([
  u.borderRadius2,
  {
    padding: rem(4),
    backgroundColor: colors.light.scheme.$blue50,
    fontWeight: 'bold',
  },
]);
