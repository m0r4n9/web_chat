import { Avatar, Indicator } from '@mantine/core';

interface ColorAvatarProps {
  username: string;
  isOnline?: boolean;
}

export const ColorAvatar = ({ username, isOnline }: ColorAvatarProps) => {
  return (
    <Indicator
      inline
      size={16}
      offset={7}
      position='bottom-end'
      color='red'
      withBorder
      disabled={!isOnline}
    >
      <Avatar name={username} color='initials' />
    </Indicator>
  );
};
