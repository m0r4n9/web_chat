import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react';

import { classNames, Mods } from '@/utils/lib/ClassNames';

import cls from './Flex.module.scss';

export type FlexJustify = 'center' | 'start' | 'end' | 'between';
export type FlexAlign = 'center' | 'start' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap =
  | '8'
  | '10'
  | '12'
  | '14'
  | '16'
  | '24'
  | '32'
  | '36'
  | '48';

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  end: cls.justifyEnd,
  center: cls.justifyCenter,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  end: cls.alignEnd,
  center: cls.alignCenter,
  stretch: cls.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  8: cls.gap8,
  10: cls.gap10,
  12: cls.gap12,
  14: cls.gap14,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
  36: cls.gap36,
  48: cls.gap48,
};

type DynamicTagProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type FlexProps<T extends ElementType> = DynamicTagProps<T> & {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  style?: CSSProperties;
  max?: boolean;
};

export const Flex = <T extends ElementType = 'div'>(props: FlexProps<T>) => {
  const {
    as: Component = 'div',
    className,
    children,
    justify = 'start',
    direction = 'row',
    align = 'start',
    gap,
    style,
    max,
    wrap = 'nowrap',
    ...rest
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    cls[wrap],
  ];
  const mods: Mods = {
    [cls.max]: max,
  };

  return (
    <Component
      style={style}
      className={classNames(cls.Stack, mods, classes)}
      {...rest}
    >
      {children}
    </Component>
  );
};
