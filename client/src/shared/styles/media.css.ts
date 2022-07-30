import { StyleRule } from '@vanilla-extract/css';

export function small(token: StyleRule) {
  return {
    '@media': {
      'screen and (max-width: 360px)': token,
    },
  };
}

export function medium(token: StyleRule) {
  return {
    '@media': {
      'screen and (max-width: 768px)': token,
    },
  };
}

export function large(token: StyleRule) {
  return {
    '@media': {
      'screen and (max-width: 1420px)': token,
    },
  };
}
