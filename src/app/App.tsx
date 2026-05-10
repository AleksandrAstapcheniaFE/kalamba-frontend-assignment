import { Suspense } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { routes } from './router/routes';

const App = () => {
  return (
    <Router>
      <Suspense
        //TODO: tech dept need normal solution
        fallback={<div className="container page" style={{ minHeight: '99vh' }} aria-busy="true" />}
      >
        <Switch>
          {routes.map(({ path, exact, component: Component }) => {
            const routeProps = { path, exact };
            return <Route key={routeProps.path} {...routeProps} component={Component} />;
          })}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
