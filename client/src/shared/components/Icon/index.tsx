import type { IconInterface } from './@types';
import Check from './Check';
import Clip from './Clip';
import Close from './Close';
import Code from './Code';
import Delete from './Delete';
import Edit from './Edit';
import Information from './Information';
import LeftChevron from './LeftChevron';
import Profile from './Profile';
import RightChevron from './RightChevron';
import Search from './Search';
import WarningFill from './WarningFill';

const mapping = {
  leftChevron: LeftChevron,
  rightChevron: RightChevron,
  warningFill: WarningFill,
  check: Check,
  information: Information,
  close: Close,
  profile: Profile,
  search: Search,
  code: Code,
  clip: Clip,
  delete: Delete,
  edit: Edit,
} as const;

const Icon = ({ icon, ...props }: IconInterface & { icon: keyof typeof mapping }) =>
  mapping[icon](props as any);

export default Icon;
