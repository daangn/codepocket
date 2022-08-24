import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { rem } from 'polished';

const gradation = keyframes({
  '0%': { backgroundColor: vars.$scale.color.gray100 },
  '50%': { backgroundColor: vars.$scale.color.gray300 },
  '100%': { backgroundColor: vars.$scale.color.gray100 },
});

export const gradationAnim = style([
  {
    backgroundColor: vars.$scale.color.gray100,
    animation: `2s infinite ${gradation}`,
  },
]);

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
  {
    justifyContent: 'space-between',
    columnGap: rem(30),
    marginBottom: rem(10),
  },
  m.medium({
    flexDirection: 'column-reverse',
    alignItems: 'start',
    rowGap: rem(5),
  }),
]);

const NameSkeleton = style([u.borderRadius2, gradationAnim]);

export const CodeNameSkeleton = style([
  NameSkeleton,
  {
    width: rem(200),
    height: rem(30),
  },
]);

export const AuthorNameSkeleton = style([
  NameSkeleton,
  {
    width: rem(150),
    height: rem(30),
  },
]);

export const codeItemHeaderCodeName = style([
  u.flexCenter,
  { columnGap: rem(7) },
  m.medium({ marginLeft: rem(2) }),
]);

export const codeItemHeaderCodeAuthor = style([u.flexCenter, { columnGap: rem(7) }]);

export const codeItemCode = style([
  u.borderRadius2,
  u.borderNone,
  gradationAnim,
  {
    height: rem(160),
    position: 'relative',
  },
]);

export const codeItemBottom = style([
  u.flex,
  {
    marginTop: rem(10),
    justifyContent: 'flex-end',
  },
]);

export const codeItemHeaderButtons = style([
  u.flex,
  {
    columnGap: rem(5),
  },
]);

export const codeItemButtonBase = style([
  u.borderRadius,
  u.borderNone,
  u.flexAlignCenter,
  gradationAnim,
  m.medium({
    width: rem(62),
    fontSize: rem(12),
  }),
]);

export const codeItemHeaderCopyButton = style([
  codeItemButtonBase,
  {
    height: rem(30),
    width: rem(70),
  },
  m.medium({
    width: rem(50),
  }),
]);

export const codeItemHeaderDetailButton = style([
  codeItemButtonBase,
  {
    width: rem(100),
    height: rem(30),
  },
]);
