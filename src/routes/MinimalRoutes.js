import { lazy } from 'react';

// project imports
import LandingPage from 'views/landing';
import DetailPage from 'views/detail-brand';
import UserOrderPage from 'views/user-orders';

import CustomLayout from 'layout/CustomLayout';
import ProtectedRoute from './ProtectedRoute';
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
    path: '/',
    element: <CustomLayout />,
    children: [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/pesanan-saya',
            element: <ProtectedRoute component={UserOrderPage} roles={['buyer']} />
        },
        {
            path: '/franchise/:slug',
            element: <DetailPage />
        }
    ]
};

export default LandingRoutes;
