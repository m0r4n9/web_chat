import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface ControllerInputProps {
    name: string;
    control: any;
    label: string;
    type?: string;
}

export const ControllerInput = ({
    name,
    control,
    label,
    type = 'text',
}: ControllerInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    type={type}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                />
            )}
        />
    );
};
