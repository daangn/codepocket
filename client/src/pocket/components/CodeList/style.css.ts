import { vars } from '@seed-design/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const codeList = style([u.fullWidth]);

export const codeItem = style([
  u.fullWidth,
  u.borderRadius2,
  { maxHeight: rem(250), marginTop: rem(70), overflow: 'hidden' },
]);

export const lastCodeItemInformation = style([
  u.flex,
  u.flexColumn,
  u.flexCenter,
  {
    rowGap: rem(10),
    color: vars.$scale.color.gray700,
  },
]);
