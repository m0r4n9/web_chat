import { classNames } from '@/utils/lib/ClassNames';

import cls from './Card.module.scss';

interface CardProps {
  className?: string;
}

export const Card = (props: CardProps) => {
  const { className } = props;
  return <div className={classNames(cls.Card, {}, [className])}></div>;
};
