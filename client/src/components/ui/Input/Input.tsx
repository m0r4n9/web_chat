import * as React from 'react';

import { classNames } from '@/utils/lib/ClassNames';

import cls from './Input.module.scss';

type InputVariant = 'default' | 'border' | 'ghost' | 'unstyled';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={classNames(cls.Input, {}, [className])}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
