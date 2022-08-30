import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

export const codeItem = style([
  u.fullWidth,
  u.borderRadius2,
  {
    marginTop: rem(50),
    position: 'relative',
  },
]);

export const codeItemHeaderInfo = style([
  u.flexAlignCenter,
  u.fullWidth,
  {
    justifyContent: 'space-between',
    fontWeight: 'bold',
    columnGap: rem(30),
    fontSize: rem(20),
    marginBottom: rem(10),
  },
  m.medium({
    flexDirection: 'column-reverse',
    alignItems: 'start',
    rowGap: rem(5),
    fontSize: rem(16),
  }),
  m.small({
    fontSize: rem(14),
  }),
]);

export const codeItemHeaderCodeName = style([
  u.flex,
  u.fullWidth,
  { columnGap: rem(7) },
  m.medium({ marginLeft: rem(2) }),
]);
export const codeItemHeaderCodeNameText = style([u.fullWidth, { overflow: 'auto' }]);

export const codeItemHeaderCodeAuthor = style([u.flexCenter, { columnGap: rem(7) }]);

export const codeItemCode = recipe({
  base: [
    u.borderRadius2,
    u.border,
    {
      position: 'relative',
      transition: 'all 0.3s ease',
      overflowY: 'hidden',
    },
  ],
  variants: {
    haveManyCode: {
      true: {
        height: rem(250),
        ':after': {
          position: 'absolute',
          content: '',
          bottom: rem(0),
          height: '10%',
          width: '100%',
          background: `linear-gradient(transparent, rgba(0, 0, 0, 0.1))`,
          pointerEvents: 'none',
        },
        ':hover': {
          border: `1px solid ${vars.$scale.color.blue700}`,
          cursor: 'pointer',
        },
      },
      false: { height: '100%' },
    },
    toggled: {
      // TODO: height의 변경 단위가 다르면 애니메이션이 동작하지 않음
      // % -> %, rem -> rem 이런식이 아니면 애니메이션이 동작하지 않음
      true: {
        height: '100%',
        ':after': {
          background: 'none',
        },
      },
    },
  },
});

export const toggler = style([
  u.fullWidth,
  u.flexCenter,
  u.cursorPointer,
  {
    position: 'absolute',
    height: rem(20),
    bottom: rem(0),
    backgroundColor: 'transparent',
    fontSize: rem(20),
  },
]);

export const rightChevronIcon = style({
  color: vars.$scale.color.blue700,
  transform: 'scale(0.5)',
  width: rem(12),
  height: rem(20),
});

export const codeItemBottom = style([
  u.flex,
  {
    marginTop: rem(10),
    justifyContent: 'space-between',
  },
]);

export const codeItemBottomButtons = style([
  u.flex,
  {
    columnGap: rem(5),
  },
]);

export const codeItemButtonBase = style([
  u.borderRadius,
  u.cursorPointer,
  u.flexAlignCenter,
  {
    width: rem(100),
    height: rem(30),
    backgroundColor: 'white',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    justifyContent: 'space-evenly',
  },
  m.medium({
    width: rem(62),
    fontSize: rem(12),
  }),
]);

export const codeItemHeaderCopyButton = style([
  codeItemButtonBase,
  {
    width: rem(80),
    backgroundColor: vars.$scale.color.gray300,
    color: vars.$scale.color.gray900,
    border: 'none',

    ':hover': {
      backgroundColor: vars.$scale.color.gray200,
    },
  },
  m.medium({
    width: rem(50),
  }),
]);

export const codeItemHeaderDetailButton = style([
  codeItemButtonBase,
  {
    border: 'none',
    backgroundColor: vars.$scale.color.blue50,
    color: vars.$scale.color.blue700,

    ':hover': {
      backgroundColor: vars.$scale.color.blue100,
    },
  },
]);
