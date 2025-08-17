import UserInformation from '@/components/view/user-information/user-information';
import dashboardClasses from './dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={dashboardClasses['dashboard-page']}>
      <div className={dashboardClasses['dashboard-page__wrapper']}>
        <h1 className={dashboardClasses['dashboard-page__title']}>Welcome to the Dashboard</h1>
        <UserInformation />
      </div>
    </div>
  );
};

export default Dashboard;
