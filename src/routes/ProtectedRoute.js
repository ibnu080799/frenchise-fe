import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useProfile from 'hooks/useProfile';

const ProtectedRoute = ({ component: Component, roles }) => {
    const [profile] = useProfile();

    if (roles && roles.indexOf(profile?.role) === -1) {
        if (profile && profile.role === 'buyer') {
            return <Navigate to="/" replace />;
        }
        if ((profile && profile.role === 'admin') || (profile && profile.role === 'seller')) {
            return <Navigate to="/app" replace />;
        }

        return <Navigate to="/auth/login" replace />;
    }

    return <Component />;
};

ProtectedRoute.propTypes = {
    component: PropTypes.any,
    roles: PropTypes.any
};

export default ProtectedRoute;
