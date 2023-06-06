import { Typography } from 'antd';
import i18n from 'translations';
import { Tokens } from '../../components/Tokens';
import { useSdk } from '../../core/logic';

interface HomeProps {}
const { Title } = Typography;

const Home: React.FC<HomeProps> = () => {
  const { initialized } = useSdk();
  return (
    <div className="home-page">
      <Title> {i18n.t('common.home')}</Title>
      <>{initialized && <Tokens />}</>
    </div>
  );
};

export default Home;
