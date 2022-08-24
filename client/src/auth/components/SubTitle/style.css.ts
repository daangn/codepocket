import { vars } from '@seed-design/design-token';
import * as m from '@shared/styles/media.css';
import * as u from '@shared/styles/utils.css';
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

export const subtitle = style([
  u.positionRelative,
  {
    color: vars.$scale.color.gray900,
    fontSize: rem(17),
  },
  m.small({
    fontSize: rem(14),
  }),
]);
