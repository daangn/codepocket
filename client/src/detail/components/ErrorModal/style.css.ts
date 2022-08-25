import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const modalContent = style([
  u.flexColumn,
  {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: rem(10),
    fontSize: rem(18),
  },
]);
