import { vars } from '@seed-design/design-token';
import * as k from '@shared/styles/keyframes.css';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const ANIMATION_DURATION_SECOND = 0.3;

export const floatingButton = recipe({
  base: [
    u.cursorPointer,
    u.fullHeight,
    u.fullWidth,
    {
      border: 'none',
      borderRadius: '50%',
      fontSize: 'inherit',
      color: vars.$static.color.staticWhite,
      backgroundColor: vars.$scale.color.blue600,
      transition: `all ${ANIMATION_DURATION_SECOND}s`,
    },
  ],
  variants: {
    selected: {
      true: {
        transform: 'rotate(315deg)',
        ':active': {
          transform: 'rotate(345deg)',
        },
      },
      false: {
        transform: 'rotate(0deg)',
        ':active': {
          transform: 'rotate(-30deg)',
        },
      },
    },
  },
});

export const wrapper = recipe({
  base: [
    u.positionFixed,
    u.flexCenter,
    {
      zIndex: 1,
      width: rem(70),
      height: rem(70),
      right: rem(50),
      bottom: rem(50),
      fontSize: rem(50),
      borderRadius: '50%',
      transition: `all ${ANIMATION_DURATION_SECOND}s linear`,
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    m.medium({
      width: rem(55),
      height: rem(55),
      right: rem(20),
      bottom: rem(20),
      fontSize: rem(30),
    }),
  ],
  variants: {
    useOnMode: {
      true: { animation: `${ANIMATION_DURATION_SECOND}s ${k.scaleUp}` },
      false: { animation: `${ANIMATION_DURATION_SECOND}s ${k.scaleDown}` },
    },
  },
});
