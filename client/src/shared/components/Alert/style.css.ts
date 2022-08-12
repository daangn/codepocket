import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const alertContainer = recipe({
  base: [
    u.fullWidth,
    u.flexAlignCenter,
    u.borderRadius,
    {
      height: 'auto',
      padding: rem(12),
      columnGap: rem(10),
    },
  ],
  variants: {
    status: {
      error: { background: colors.light.scheme.$red50 },
      info: { background: colors.light.scheme.$blue50 },
      success: { background: colors.light.scheme.$green50 },
      warning: { background: colors.light.scheme.$carrot100 },
    },
  },
});

export const alertTextContainer = style([
  u.flexColumn,
  {
    rowGap: rem(6),
  },
]);

export const alertTitle = style({
  fontSize: rem(18),
  fontWeight: 'bold',
});

export const alertDescription = style([
  {
    fontSize: rem(14),
  },
]);
