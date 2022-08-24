import { vars } from '@seed-design/design-token';
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
      error: { background: vars.$scale.color.red100 },
      info: { background: vars.$scale.color.blue100 },
      success: { background: vars.$scale.color.green50 },
      warning: { background: vars.$scale.color.carrot100 },
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
