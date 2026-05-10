import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../shared/lib/hooks/use-auth';

export const Header = () => {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>

          {auth.isAuthenticated ? (
            <>
              <li className="nav-item">
                <NavLink to="/editor" className="nav-link" activeClassName="active">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Log out
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/login">
                  Sign in
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
