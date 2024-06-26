import { Skeleton, Stack } from '@mui/material';

import cls from './MessagesSkeleton.module.scss';

export const MessagesSkeleton = () => {
    const skeletons = [
        false,
        true,
        true,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
    ];

    return (
        <Stack spacing={-1}>
            {skeletons.map((skeleton, index) => (
                <Skeleton
                    key={index}
                    animation='wave'
                    width={140}
                    sx={{ fontSize: '2rem' }}
                    className={`${cls.skeletonMessage} ${skeleton ? `${cls.isMine}` : ''}`}
                />
            ))}
        </Stack>
    );
};
