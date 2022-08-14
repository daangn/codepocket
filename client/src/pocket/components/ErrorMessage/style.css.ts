import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const alertBase = style([
  u.fullWidth,
  u.flexColumn,
  u.flexCenter,
  {
    fontWeight: 'bold',
    fontSize: rem(18),
    margin: rem(30),
    padding: rem(10),
    gap: rem(15),
  },
]);
