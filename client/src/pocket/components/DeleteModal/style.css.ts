import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const deleteModalContainer = style([u.flexColumn, { width: rem(400), rowGap: rem(10) }]);

export const deleteModalButtonContainer = style([u.flex, { columnGap: rem(10) }]);

export const deleteModalHeaderText = style({ fontSize: rem(20) });
