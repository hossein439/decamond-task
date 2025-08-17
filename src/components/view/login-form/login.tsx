'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/schemas/loginSchema';
import Button from '@/components/base/button/button';
import Input from '@/components/base/input/input';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/auth';
import loginClasses from './login.module.scss';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const loginUser = useAuthStore((state) => state.login);
  const { setUserInformation } = useAuthStore((state) => state);
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
    <form onSubmit={handleSubmit(handleLoginSubmit)} className={loginClasses['login-form']}>
      <Input
        {...register('phoneNumber')}
        error={errors.phoneNumber}
        isDisabled={isPending}
        appendIcon="phone.filled"
        name="phoneNumber"
        type="number"
        placeholder="Please enter phone number"
        label="phone number"
      />

      <Button fullWidth isLoading={isPending}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
