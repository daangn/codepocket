import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const editModalContainer = style([u.flexColumn, { rowGap: rem(10) }]);

export const editModalButtonContainer = style([u.flex, { columnGap: rem(10) }]);

export const editModalHeaderText = style({ fontSize: rem(20) });
