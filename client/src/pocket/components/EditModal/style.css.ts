import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as t from '@shared/styles/token.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const label = style([t.mt12, { display: 'block', fontSize: rem(18) }]);

export const editModalContainer = style([
  { width: rem(700), height: '70vh' },
  m.medium({ width: '100vw', height: '100vh', padding: rem(10) }),
]);

export const editModalTitleInput = style([
  u.border,
  u.fullWidth,
  u.borderRadius2,
  {
    outline: 'none',
    height: rem(34),
    fontSize: rem(16),
    paddingLeft: rem(15),
  },
]);

export const editModalContent = style([u.flexColumn, u.fullHeight]);

export const editModalButtonContainer = style([u.flex, t.mt12, { columnGap: rem(10) }]);

export const editModalHeaderWrapper = style([u.flex, { gap: rem(10) }]);

export const editModalHeaderText = style([t.typography.heading5]);

export const toggleSwitch = style([
  { position: 'relative', display: 'inline-block', width: rem(60), height: rem(34) },
]);

export const toggleSwitchInput = style({
  opacity: 0,
  width: 0,
  height: 0,
});

export const toggleSwitchSlider = style([
  u.cursorPointer,
  u.positionAbsolute,
  {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: '0.3s',
    borderRadius: rem(6),

    ':before': {
      content: '',
      position: 'absolute',
      height: rem(26),
      width: rem(26),
      left: rem(4),
      bottom: rem(4),
      backgroundColor: vars.$static.color.staticWhite,
      transition: '0.3s',
      borderRadius: rem(6),
    },

    selectors: {
      [`${toggleSwitchInput}:checked + &`]: {
        backgroundColor: `${vars.$scale.color.blue600}`,
      },

      [`${toggleSwitchInput}:checked:hover + &`]: {
        backgroundColor: `${vars.$scale.color.blue400}`,
      },

      [`${toggleSwitchInput}:checked + &:before`]: {
        transform: `translateX(26px)`,
      },

      [`${toggleSwitchInput}:focus + &`]: {
        boxShadow: `0 0 1px ${vars.$scale.color.blue600}`,
      },
    },
  },
]);
