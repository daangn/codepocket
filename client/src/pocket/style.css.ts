import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const wrapper = style([
  u.flex,
  u.flexColumn,
  u.flexAlignCenter,
  { margin: '0 auto', width: rem(700), paddingBottom: rem(40) },
  m.medium({
    width: '90%',
  }),
]);

export const title = style([
  t.mt50,
  t.typography.heading2,
  { textAlign: 'center' },
  m.medium({ fontSize: rem(40) }),
  m.small({ fontSize: rem(34) }),
]);

export const codeList = style([u.fullWidth]);

export const codeItem = style([
  u.fullWidth,
  u.borderRadius2,
  { maxHeight: rem(250), marginTop: rem(70), overflow: 'hidden' },
]);

export const codeItemHeader = style([
  u.fullWidth,
  u.flex,
  u.flexAlignCenter,
  u.cursorPointer,
  { height: rem(50), justifyContent: 'space-between', padding: `0 ${rem(20)}` },
]);

export const codeItemInfo = style([{ fontWeight: 'bold' }]);

export const codeItemCode = style([{ backgroundColor: vars.$scale.color.gray300 }]);
