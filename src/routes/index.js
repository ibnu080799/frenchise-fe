import { Navigate, useNavigate, useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import useProfile from 'hooks/useProfile';
import MinimalRoutes from './MinimalRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const [profile] = useProfile();

    if (profile) {
        MainRoutes.element = <MainLayout />;
        if (profile.role === 'seller' || profile.role === 'admin') {
            AuthenticationRoutes.element = <Navigate to="/app/dashboard" />;
        } else {
            AuthenticationRoutes.element = <Navigate to="/" />;
        }
    } else {
        MainRoutes.element = <Navigate to="/auth/login" />;
        AuthenticationRoutes.element = <MinimalLayout />;
    }

    return useRoutes([MainRoutes, AuthenticationRoutes, MinimalRoutes], config.basename);
}
