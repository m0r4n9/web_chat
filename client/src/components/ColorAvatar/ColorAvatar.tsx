import { Avatar } from '@mantine/core';

interface ColorAvatarProps {
  username: string;
}

export const ColorAvatar = ({ username }: ColorAvatarProps) => {
  return <Avatar name={username} color='initials' />;
};
