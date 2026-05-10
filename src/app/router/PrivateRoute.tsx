import type { RouteProps } from 'react-router-dom';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuth } from 'shared/lib/hooks/use-auth';

type PrivateRouteProps = RouteProps;

export const PrivateRoute = ({ children, component: Component, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { next: location.pathname },
              }}
            />
          );
        }

        if (Component) {
          return <Component {...props} />;
        }

        return <>{children}</>;
      }}
    />
  );
};
