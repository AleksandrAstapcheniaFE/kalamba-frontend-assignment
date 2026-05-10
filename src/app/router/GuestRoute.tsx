import type { RouteProps } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'shared/lib/hooks/use-auth';

type GuestRouteProps = RouteProps & { redirectTo?: string };

export const GuestRoute = ({
  children,
  component: Component,
  redirectTo = '/',
  ...rest
}: GuestRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Redirect to={redirectTo} />;
        }

        if (Component) {
          return <Component {...props} />;
        }

        return <>{children}</>;
      }}
    />
  );
};
