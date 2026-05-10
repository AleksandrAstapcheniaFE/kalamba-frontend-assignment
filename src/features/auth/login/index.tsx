import { useLogin } from './model/use-login';
import { LoginForm } from './ui/login-form';

export const Login = () => {
  const props = useLogin();
  return <LoginForm {...props} />;
};
