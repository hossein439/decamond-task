'use client';

import useAuthStore from '@/store/auth';
import dashboardClasses from './dashboard.module.scss';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const userInformation = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userInformation);
  }, [userInformation]);

  // useEffect(() => {
  //   console.log(loading);

  //   if (!loading && userInformation === null) {
  //     redirect('/auth');
  //   }
  // }, [loading, userInformation]);

  return (
    <div className={dashboardClasses['dashboard-page']}>
      <div className={dashboardClasses['dashboard-page__wrapper']}>
        {loading ? <div>Loading...</div> : <h1 className={dashboardClasses['dashboard-page__title']}>Welcome to the Dashboard</h1>}
      </div>
    </div>
  );
};

export default Dashboard;
