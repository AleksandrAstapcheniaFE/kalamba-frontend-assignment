import { Suspense } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Layout } from 'shared/ui/Layout';
import { GuestRoute } from './router/GuestRoute';
import { PrivateRoute } from './router/PrivateRoute';
import { routes } from './router/routes';

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <div className="container page" style={{ minHeight: '99vh' }} aria-busy="true" />
          } //TODO: tech dept need normal solution
        >
          <Switch>
            {routes.map(({ path, exact, component: Component, guard }) => {
              const routeProps = { path, exact };

              if (guard === 'private') {
                return <PrivateRoute key={routeProps.path} {...routeProps} component={Component} />;
              }

              if (guard === 'guest') {
                return <GuestRoute key={routeProps.path} {...routeProps} component={Component} />;
              }
              return <Route key={routeProps.path} {...routeProps} component={Component} />;
            })}
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
