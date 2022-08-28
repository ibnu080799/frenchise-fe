import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

// Admin page routing
const ProductPage = Loadable(lazy(() => import('views/products/index')));
const EditProductPage = Loadable(lazy(() => import('views/products/edit')));
const ListBrandPage = Loadable(lazy(() => import('views/brands/list')));
const EditBrandPage = Loadable(lazy(() => import('views/brands/edit')));
const ListUserPage = Loadable(lazy(() => import('views/users/list')));
const EditUserPage = Loadable(lazy(() => import('views/users/edit')));
const ListOrderPage = Loadable(lazy(() => import('views/orders/list')));

// Seller page routing
const CreateProductPage = Loadable(lazy(() => import('views/products/create')));
const MyBrandPage = Loadable(lazy(() => import('views/brands/mybrand')));
const EditOrderPage = Loadable(lazy(() => import('views/orders/edit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/app',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <ProtectedRoute component={Dashboard} roles={['admin', 'seller']} />
        },
        {
            path: '/dashboard',
            element: <ProtectedRoute component={Dashboard} roles={['admin', 'seller']} />
        },
        {
            path: '/users',
            element: <ProtectedRoute component={ListUserPage} roles={['admin']} />
        },
        {
            path: '/users/:id',
            element: <ProtectedRoute component={EditUserPage} roles={['admin']} />
        },
        {
            path: '/users/create',
            element: <ProtectedRoute component={ProductPage} roles={['admin']} />
        },
        {
            path: '/products',
            element: <ProtectedRoute component={ProductPage} roles={['admin', 'seller']} />
        },
        {
            path: '/products/create',
            element: <ProtectedRoute component={CreateProductPage} roles={['admin', 'seller']} />
        },
        {
            path: '/products/:id',
            element: <ProtectedRoute component={EditProductPage} roles={['admin', 'seller']} />
        },
        {
            path: '/brands',
            element: <ProtectedRoute component={ListBrandPage} roles={['admin']} />
        },
        {
            path: '/brands/:id',
            element: <ProtectedRoute component={EditBrandPage} roles={['admin']} />
        },
        {
            path: '/brands/my-brand',
            element: <ProtectedRoute component={MyBrandPage} roles={['seller']} />
        },
        {
            path: '/orders',
            element: <ProtectedRoute component={ListOrderPage} roles={['seller', 'admin']} />
        },
        {
            path: '/orders/:id',
            element: <ProtectedRoute component={EditOrderPage} roles={['seller']} />
        }
    ]
};

export default MainRoutes;
