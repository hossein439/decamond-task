import authClasses from './auth.module.scss';
import LoginForm from '@/components/view/login-form/login';

const Auth: React.FC = () => {
  return (
    <div className={authClasses['auth-page']}>
      <div className={authClasses['auth-page__form-wrapper']}>
        <h1 className={authClasses['auth-page__title']}>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;
