'use client';
import useAuthStore from '@/store/auth';
import userInfoClasses from './user-information.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserInformation = () => {
  const { user: userInformation, isHydrated } = useAuthStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (isHydrated && userInformation === null) {
      router.push('/auth');
    }
  }, [isHydrated, userInformation]);

  return (
    <div className={userInfoClasses['user-information']}>
      <div className={userInfoClasses['user-information__wrapper-item']}>
        <span className={userInfoClasses['user-information__label']}>phone:</span>
        <span className={userInfoClasses['user-information__value']}>{userInformation?.cell}</span>
      </div>
      <div className={userInfoClasses['user-information__wrapper-item']}>
        <span className={userInfoClasses['user-information__label']}>gender:</span>
        <span className={userInfoClasses['user-information__value']}>{userInformation?.gender}</span>
      </div>
    </div>
  );
};

export default UserInformation;
