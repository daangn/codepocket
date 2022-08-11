import Check, { CheckType } from './Check';
import Clip from './Clip';
import Code from './Code';
import Information, { InformationType } from './Information';
import LeftChevron, { LeftChevronType } from './LeftChevron';
import Profile from './Profile';
import RightChevron, { RightChevronType } from './RightChevron';
import Search from './Search';
import WarningFill, { WarningFillType } from './WarningFill';

/**
 * 사용법
 * 1. IconType에 AddIconName을 이용해서 iconName 추가
 * 2. mapping에 iconName을 key, 컴포넌트를 value로 가지는 속성 추가
 * Icon컴포넌트를 만들 때 icon prop을 지정해주면 해당 icon에 맞는 타입들이 자동으로 설정됨
 */
type LookUp<U, T> = U extends { icon: T } ? U : never;
type AddIconName<T, K> = T & { icon: K };
type IconType =
  | AddIconName<LeftChevronType, 'leftChevron'>
  | AddIconName<RightChevronType, 'rightChevron'>
  | AddIconName<WarningFillType, 'warningFill'>
  | AddIconName<InformationType, 'information'>
  | AddIconName<CheckType, 'check'>
  | AddIconName<{}, 'profile'>
  | AddIconName<{}, 'search'>
  | AddIconName<{}, 'code'>
  | AddIconName<{}, 'clip'>;

const mapping = {
  leftChevron: (param: LeftChevronType) => LeftChevron(param),
  rightChevron: (param: RightChevronType) => RightChevron(param),
  warningFill: (param: WarningFillType) => WarningFill(param),
  check: (param: RightChevronType) => Check(param),
  information: (param: InformationType) => Information(param),
  profile: () => Profile(),
  search: () => Search(),
  code: () => Code(),
  clip: () => Clip(),
} as const;

const Icon = <T extends keyof typeof mapping>({ icon, ...props }: LookUp<IconType, T>) =>
  mapping[icon](props as any);

export default Icon;
