import cls from './Message.module.scss';
import clsx from 'clsx';

interface MessageProps {
    message: string;
    isMine?: boolean;
}

export const Message = (props: MessageProps) => {
    const { message, isMine = false } = props;

    return (
        <div className={clsx(cls.message, isMine && `${cls.isMine}`)}>
            {message}
        </div>
    );
};
