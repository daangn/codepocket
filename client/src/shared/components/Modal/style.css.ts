import { colors } from '@karrotmarket/design-token';
import * as u from '@shared/styles/utils.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';
import { ANIMATION_DURATION } from '.';

const MODAL_Z_INDEX = 100;
const ANIMATION_DURATION_SECOND = ANIMATION_DURATION / 1000;

const fadeIn = (to: number) =>
  keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: to },
  });
const fadeOut = (from: number) =>
  keyframes({
    '0%': { opacity: from },
    '100%': { opacity: 0 },
  });
const scaleUp = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});
const scaleDown = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
});

export const modalContainer = recipe({
  base: [
    {
      zIndex: MODAL_Z_INDEX,
    },
  ],
  variants: {
    isOpen: {
      true: { display: 'block' },
      false: { display: 'none' },
    },
  },
});

export const modalOverlay = recipe({
  base: [
    u.fixedPos,
    u.top0,
    u.left0,
    u.fullHeight,
    u.fullWidth,
    {
      background: colors.light.scheme.$gray900,
      opacity: 0.3,
    },
  ],
  variants: {
    isAnimation: {
      false: { animation: `${ANIMATION_DURATION_SECOND}s ${fadeOut(0.3)}` },
      true: { animation: `${ANIMATION_DURATION_SECOND}s ${fadeIn(0.3)}` },
    },
  },
});

export const modalContentContainer = style([u.fixedPos, u.top0, u.left0, u.fullSize, u.flexCenter]);

export const modalContent = recipe({
  base: [
    u.flexColumn,
    u.borderRadius2,
    {
      width: rem(375),
      height: rem(375),
      // height: 'auto',
      backgroundColor: 'white',
      padding: rem(15),
    },
  ],
  variants: {
    isAnimation: {
      false: {
        animation: `${ANIMATION_DURATION_SECOND}s ${fadeOut(1)}, ${ANIMATION_DURATION_SECOND}s ${scaleDown}`,
      },
      true: { animation: `${ANIMATION_DURATION_SECOND}s ${fadeIn(1)}, ${ANIMATION_DURATION_SECOND}s ${scaleUp}` },
    },
  },
});
