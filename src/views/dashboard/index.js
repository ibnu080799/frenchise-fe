import useProfile from 'hooks/useProfile';
import React from 'react';
import DashboardAdmin from './admin';
import DashboardSeller from './seller';

const Dashboard = () => {
    const [profile] = useProfile();

    return <>{profile.role === 'admin' ? <DashboardAdmin /> : <DashboardSeller />}</>;
};

export default Dashboard;
