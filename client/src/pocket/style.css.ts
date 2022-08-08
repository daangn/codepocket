import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const wrapper = style([
  u.flex,
  u.flexColumn,
  u.flexAlignCenter,
  { margin: '0 auto', width: rem(700) },
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

export const codeItemCode = style([{ backgroundColor: colors.light.scheme.$gray300 }]);

export const highlight = style({
  color: colors.light.scheme.$carrot600,
  fontWeight: 'normal',
});

export const lastCodeItem = style([
  u.fullWidth,
  u.borderRadius2,
  u.flexCenter,
  {
    background: colors.light.scheme.$gray100,
    height: rem(250),
    marginTop: rem(60),
  },
]);

export const lastCodeItemInformation = style([
  u.flex,
  u.flexColumn,
  u.flexCenter,
  {
    rowGap: rem(10),
    color: colors.light.scheme.$gray700,
  },
]);
