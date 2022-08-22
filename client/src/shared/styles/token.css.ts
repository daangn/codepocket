import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

const heading1 = style({
  fontSize: rem(62),
  fontWeight: 800,
  lineHeight: '115%',
});

const heading2 = style({
  fontSize: rem(50),
  fontWeight: 800,
  lineHeight: '115%',
});

const heading3 = style({
  fontSize: rem(40),
  fontWeight: 700,
  lineHeight: '120%',
});

const heading4 = style({
  fontSize: rem(34),
  fontWeight: 600,
  lineHeight: '120%',
});

const heading5 = style({
  fontSize: rem(26),
  fontWeight: 600,
  lineHeight: '120%',
});

const subtitle1 = style({
  fontSize: rem(32),
  fontWeight: 800,
  lineHeight: '120%',
});

const subtitle2 = style({
  fontSize: rem(26),
  fontWeight: 700,
  lineHeight: '120%',
});

const subtitle3 = style({
  fontSize: rem(20),
  fontWeight: 600,
  lineHeight: '140%',
});

const subtitle4 = style({
  fontSize: rem(18),
  fontWeight: 600,
  lineHeight: '140%',
});

const body1 = style({
  fontSize: rem(18),
  lineHeight: '150%',
});

const body2 = style({
  fontSize: rem(16),
  lineHeight: '140%',
});

const body3 = style({
  fontSize: rem(15),
  lineHeight: '140%',
});

const caption1 = style({
  fontSize: rem(14),
  lineHeight: '140%',
});

const caption2 = style({
  fontSize: rem(13),
  lineHeight: '140%',
});

const caption3 = style({
  fontSize: rem(12),
  lineHeight: '140%',
});

export const typography = {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  subtitle1,
  subtitle2,
  subtitle3,
  subtitle4,
  body1,
  body2,
  body3,
  caption1,
  caption2,
  caption3,
};

export const lineHeight1 = style({
  lineHeight: '150%',
});

export const lineHeight2 = style({
  lineHeight: '140%',
});

export const lineHeight3 = style({
  lineHeight: '120%',
});

export const lineHeight4 = style({
  lineHeight: '115%',
});

export const mt6 = style({
  marginTop: rem(6),
});

export const mt12 = style({
  marginTop: rem(12),
});

export const mt16 = style({
  marginTop: rem(16),
});

export const mt18 = style({
  marginTop: rem(18),
});

export const mt50 = style({
  marginTop: rem(50),
});

export const mb6 = style({
  marginBottom: rem(6),
});

export const mb12 = style({
  marginBottom: rem(12),
});

export const mb18 = style({
  marginBottom: rem(18),
});

export const mb24 = style({
  marginBottom: rem(24),
});
