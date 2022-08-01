import { colors } from '@karrotmarket/design-token';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { rem } from 'polished';

const shake = keyframes({
  '0%': { transform: 'translateX(-12px)' },
  '10%': { transform: 'translateX(12px)' },
  '20%': { transform: 'translateX(-10px)' },
  '30%': { transform: 'translateX(10px)' },
  '40%': { transform: 'translateX(-7px)' },
  '50%': { transform: 'translateX(7px)' },
  '60%': { transform: 'translateX(-4px)' },
  '70%': { transform: 'translateX(4px)' },
  '80%': { transform: 'translateX(-2px)' },
  '90%': { transform: 'translateX(2px)' },
  '100%': { transform: 'translateX(-1px)' },
});

export const button = recipe({
  base: [
    u.fullWidth,
    u.borderNone,
    u.borderRadius2,
    u.cursorPointer,
    {
      height: rem(52),
      fontSize: rem(16),
      backgroundColor: colors.light.scheme.$blue800,
      color: 'white',
      fontWeight: 'bold',
      transition: 'background 0.2s ease',

      ':hover': {
        backgroundColor: '#0A86B766',
      },
    },
    m.small({
      width: '90vw',
    }),
  ],
  variants: {
    isShaking: {
      true: { animation: `1s ${shake}` },
    },
  },
});
