import { TextInput, TextInputProps } from '@mantine/core';
import * as React from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseControllerProps,
} from 'react-hook-form';

interface FormInputControllerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextInputProps, 'name' | 'control' | 'defaultValue'> {
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: T[keyof T];
  type?: React.HTMLInputTypeAttribute;
  rules?: RegisterOptions;
}

export const ControllerInput = <T extends FieldValues>({
  name,
  control,
  rules,
  type = 'text',
  ...textInputProps
}: FormInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          {...textInputProps}
          error={error ? error.message : null}
          onChange={onChange}
          type={type}
          value={value}
        />
      )}
    />
  );
};
