import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const wrapper = style([u.flexColumn, u.flexAlignCenter, u.fullWidth, u.fullHeight]);

export const codeBlock = style([
  t.mt50,
  {
    width: rem(1400),
  },
  m.large({
    width: '100%',
    padding: '0 1rem',
  }),
]);

export const header = style([
  u.flex,
  u.fullWidth,
  { justifyContent: 'space-between', alignItems: 'center' },
]);

export const headerIcon = style([
  u.cursorPointer,
  {
    width: rem(50),
  },
  m.medium({
    width: rem(30),
  }),
]);

export const title = style([
  {
    fontSize: rem(48),
    fontWeight: 'bold',
  },
  m.medium({
    fontSize: rem(30),
  }),
]);

export const highlight = style({
  color: vars.$scale.color.blue800,
  fontWeight: 'normal',
});

export const article = style([u.fullWidth, t.mt18, { zIndex: -1 }]);

export const modalContent = style([
  u.flexColumn,
  {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: rem(10),
    fontSize: rem(18),
  },
]);
