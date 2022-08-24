import { vars } from '@seed-design/design-token';
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
    backgroundColor: vars.$scale.color.blue100,
    fontWeight: 'bold',
  },
]);
