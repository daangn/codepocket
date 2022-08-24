import { colors } from '@karrotmarket/design-token';
import { vars } from '@seed-design/design-token';
import * as k from '@shared/styles/keyframes.css';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const MODAL_Z_INDEX = 100;
const ANIMATION_DURATION_SECOND = 0.15;

export const modalContainer = recipe({
  base: [u.flexCenter, u.fixedPos, u.top0, u.left0, u.fullSize, { zIndex: 100 }],
  variants: {
    isOpen: {
      true: { display: 'flex' },
      false: { display: 'none' },
    },
  },
});

export const modalOverlay = recipe({
  base: [
    u.positionAbsolute,
    u.top0,
    u.left0,
    u.fullHeight,
    u.fullWidth,
    {
      background: colors.light.scheme.$gray900,
      opacity: 0.3,
      zIndex: MODAL_Z_INDEX,
    },
  ],
  variants: {
    isAnimation: {
      false: { animation: `${ANIMATION_DURATION_SECOND}s ${k.fadeOut(0.3)}` },
      true: { animation: `${ANIMATION_DURATION_SECOND}s ${k.fadeIn(0.3)}` },
    },
  },
});

export const modalContent = recipe({
  base: [
    u.positionRelative,
    u.flexColumn,
    u.borderRadius2,
    {
      backgroundColor: 'white',
      padding: rem(15),
      zIndex: MODAL_Z_INDEX,
    },
  ],
  variants: {
    isAnimation: {
      false: {
        animation: `${ANIMATION_DURATION_SECOND}s ${k.fadeOut(1)}, ${ANIMATION_DURATION_SECOND}s ${
          k.scaleDown
        }`,
      },
      true: {
        animation: `${ANIMATION_DURATION_SECOND}s ${k.fadeIn(1)}, ${ANIMATION_DURATION_SECOND}s ${
          k.scaleUp
        }`,
      },
    },
  },
});

export const modalCloseButton = style([
  u.positionAbsolute,
  u.right0,
  u.top0,
  u.cursorPointer,
  u.borderRadius2,
  {
    padding: rem(5),
    margin: rem(5),
    transition: 'background 0.3s ease',
    ':hover': {
      backgroundColor: colors.light.scheme.$gray100,
    },
  },
]);

export const modalDescription = style([
  {
    fontSize: rem(16),
  },
]);

const modalBaseButton = style([
  u.fullWidth,
  u.borderNone,
  u.borderRadius2,
  u.cursorPointer,
  {
    height: rem(45),
    fontSize: rem(14),
    backgroundColor: colors.light.scheme.$blue800,
    color: vars.$static.color.staticWhite,
    fontWeight: 'bold',
    transition: 'background 0.2s ease',

    ':hover': {
      backgroundColor: '#0A86B766',
    },
  },
  m.small({
    width: '90vw',
  }),
]);

export const modalConfirmButton = recipe({
  base: [modalBaseButton],
  variants: {
    variant: {
      warn: {
        backgroundColor: vars.$scale.color.red500,
        ':hover': {
          backgroundColor: vars.$scale.color.red300,
        },
      },
      normal: {
        backgroundColor: vars.$scale.color.blue600,
        ':hover': {
          backgroundColor: vars.$scale.color.blue400,
        },
      },
    },
  },
});

export const modalCancelButton = style([
  modalBaseButton,
  {
    backgroundColor: vars.$scale.color.gray600,
    ':hover': {
      backgroundColor: vars.$scale.color.gray500,
    },
  },
]);
