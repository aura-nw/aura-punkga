import { Card as AntCard, CardProps } from 'antd';
import classnames from 'classnames';

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  const classes = classnames('card', className);
  return <AntCard className={classes} {...props} />;
};

export default Card;
