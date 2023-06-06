import { Link } from 'react-router-dom';
import { ConnectWallet } from '../ConnectWallet';
import logo from 'assets/images/logo.svg';
import { URL } from 'constants/url';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions } from '../../_redux';
import Menu from './Menu';
import { selectCurrentTheme } from '../../_redux/selectors';
import { Themes } from '../../constants/constants';
import classnames from 'classnames';
import { ReactComponent as vectorIcon } from 'assets/images/vector.svg';
import { ReactComponent as sunIcon } from 'assets/images/sun.svg';
// import { ReactComponent as logoIcon } from 'assets/images/logo.svg';
import Icon from '@ant-design/icons';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);
  return (
    <div className="page-header">
      <div className="container">
        <div className="page-header__logo">
          <Link to={URL.HOME}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="page-header__content">
          <div className="page-header__menu">
            <Menu />
          </div>

          <Space>
            <div className="theme-toggle">
              <div
                className={classnames(
                  'theme-icon',
                  currentTheme === Themes.LIGHT && 'active'
                )}
              >
                <Icon
                  className="icon"
                  component={sunIcon}
                  onClick={() =>
                    currentTheme !== Themes.LIGHT &&
                    dispatch(commonActions.changeTheme())
                  }
                />
              </div>
              <div
                className={classnames(
                  'theme-icon',
                  currentTheme === Themes.DARK && 'active'
                )}
              >
                <Icon
                  className="icon"
                  component={vectorIcon}
                  onClick={() =>
                    currentTheme !== Themes.DARK &&
                    dispatch(commonActions.changeTheme())
                  }
                />
              </div>
            </div>
            <ConnectWallet />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
