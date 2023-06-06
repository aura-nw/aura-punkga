import { Switch as AntSwitch, SwitchProps } from 'antd';

const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
  return <AntSwitch className={className} {...props} />;
};

export default Switch;
