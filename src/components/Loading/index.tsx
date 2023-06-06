import { Spin } from 'antd';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
