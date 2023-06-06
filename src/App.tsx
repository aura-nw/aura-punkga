import { lazy, Suspense, useLayoutEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound, Header, Footer, Loading, Content } from './components';
import { URL } from 'constants/url';
import ErrorBoundary from './components/ErrorBoundary';
import { config } from './config';
import { ErrorProvider, SdkProvider } from './core/logic';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from './_redux/selectors';

// Lazy load
const Home = lazy(() => import('./pages/Home'));

function App() {
  const currentTheme = useSelector(selectCurrentTheme);

  useLayoutEffect(() => {
    const bodyClass = document.body.classList;
    !bodyClass.contains('halo') && bodyClass.add('halo');
  }, []);

  return (
    <div className={`theme-${currentTheme}`}>
      <ErrorProvider>
        <SdkProvider config={config}>
          <BrowserRouter>
            <ErrorBoundary fallback={<ErrorBoundary.Fallback />}>
              <div className="halo">
                <Header />
                <Content>
                  <Suspense fallback={<Loading />}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path={URL.HOME} component={Home} />
                      <Route component={NotFound} />
                    </Switch>
                  </Suspense>
                </Content>
                <Footer />
              </div>
            </ErrorBoundary>
          </BrowserRouter>
        </SdkProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
