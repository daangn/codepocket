import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const modalParagraph = style([
  u.textAlignCenter,
  t.mb24,
  t.mt18,
  {
    fontSize: rem(20),
  },
]);

export const buttonWrapper = style([u.flex, { gap: rem(10) }]);
