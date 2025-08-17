'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/schemas/loginSchema';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/auth';
import authClasses from './auth.module.scss';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const loginUser = useAuthStore((state) => state.login);
  const setUserInformation = useAuthStore((state) => state.setUserInformation);
  const router = useRouter();

  const { mutate: fetchUserInformation, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const userInformation = res.data?.results[0];
      setUserInformation(userInformation);
      router.push('/dashboard');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = (data: LoginFormValues) => {
    fetchUserInformation();
  };

  return (
    <div className={authClasses['login-page']}>
      <div className={authClasses['login-page__form-wrapper']}>
        <h1 className={authClasses['login-page__title']}>Login</h1>
        <form onSubmit={handleSubmit(handleLoginSubmit)} className={authClasses['login-page__form']}>
          <Input
            {...register('phoneNumber')}
            error={errors.phoneNumber}
            isDisabled={isPending}
            name="phoneNumber"
            type="number"
            placeholder="Please enter phone number"
            label="phone number"
          />

          <Button fullWidth isLoading={isPending}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
