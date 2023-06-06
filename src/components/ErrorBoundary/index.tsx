import { Component } from 'react';
import Icon from '@ant-design/icons';

import { ReactComponent as errorBoundary } from 'assets/images/errorBoundary.svg';
import { useTranslation } from 'react-i18next';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[ERROR]', error);
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

const ErrorBoundaryFallback = () => {
  const { t } = useTranslation();

  return (
    <div className="page-content container error-boundary">
      <Icon className="error-boundary__icon" component={errorBoundary} />
      <div className="error-boundary__title">
        {t('common.somethingWentWrong')}
      </div>
    </div>
  );
};

interface StaticErrorBoundaryProps
  extends React.ExoticComponent<ErrorBoundaryProps> {
  Fallback: typeof ErrorBoundaryFallback;
}
const StaticErrorBoundary = ErrorBoundary as any as StaticErrorBoundaryProps;
StaticErrorBoundary.Fallback = ErrorBoundaryFallback;

export default StaticErrorBoundary;
