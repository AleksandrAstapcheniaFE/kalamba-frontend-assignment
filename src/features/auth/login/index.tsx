import { useLogin } from './model';
import { LoginForm } from './ui/login-form';

export const Login = () => {
  const props = useLogin();
  return <LoginForm {...props} />;
};
