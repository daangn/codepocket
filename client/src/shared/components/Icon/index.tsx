import Code from './Code';
import Information from './Information';
import LeftChevron, { LeftChevronType } from './LeftChevron';
import RightChevron, { RightChevronType } from './RightChevron';
import Search from './Search';

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
  | AddIconName<{}, 'information'>
  | AddIconName<{}, 'search'>
  | AddIconName<{}, 'code'>;

const mapping = {
  leftChevron: (param: LeftChevronType) => LeftChevron(param),
  rightChevron: (param: RightChevronType) => RightChevron(param),
  information: () => Information(),
  search: () => Search(),
  code: () => Code(),
} as const;

const Icon = <T extends keyof typeof mapping>({ icon, ...props }: LookUp<IconType, T>) =>
  mapping[icon](props as any);

export default Icon;
