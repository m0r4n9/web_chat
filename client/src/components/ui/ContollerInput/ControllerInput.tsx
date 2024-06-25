import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import {
    Control,
    Controller,
    FieldPath,
    FieldValues,
    RegisterOptions,
    UseControllerProps,
} from 'react-hook-form';

type TextFieldVariants = 'outlined' | 'filled' | 'standard';

interface FormInputControllerProps<T extends FieldValues>
    extends UseControllerProps<T> {
    name: FieldPath<T>;
    control: Control<T>;
    defaultValue?: T[keyof T];
    type?: HTMLInputTypeAttribute;
    inputVariant?: TextFieldVariants;
    rules?: RegisterOptions;
    label: string;
    placeholder?: string;
}

export const ControllerInput = <T extends FieldValues>({
    name,
    control,
    rules,
    type,
    label,
    inputVariant = 'outlined',
}: FormInputControllerProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size='small'
                    error={Boolean(error)}
                    onChange={onChange}
                    type={type}
                    value={value}
                    fullWidth
                    label={label}
                    variant={inputVariant}
                />
            )}
        />
    );
};
