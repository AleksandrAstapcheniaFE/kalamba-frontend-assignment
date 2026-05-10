import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authStore } from 'stores/auth.store';

export const Logout = () => {
  const logout = authStore((state) => state.logout);
  const history = useHistory();

  useEffect(() => {
    logout();
    history.replace('/');
  }, [logout, history]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Logging out…</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
