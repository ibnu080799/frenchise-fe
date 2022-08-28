// assets
import {
    IconBrandChrome,
    IconHelp,
    IconUsers,
    IconReceipt,
    IconBuildingStore,
    IconOutlet,
    IconBuilding,
    IconDashboard
} from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconUsers, IconReceipt, IconBuildingStore, IconOutlet, IconBuilding, IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const admins = {
    id: 'admin',
    title: 'Admin',
    caption: 'Selamat datang',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/app/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'users',
                    title: 'List',
                    type: 'item',
                    url: '/app/users'
                }
            ]
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'collapse',
            icon: icons.IconReceipt,
            children: [
                {
                    id: 'orders',
                    title: 'List',
                    type: 'item',
                    url: '/app/orders'
                }
            ]
        },
        {
            id: 'products',
            title: 'Products',
            type: 'collapse',
            icon: icons.IconBuildingStore,
            children: [
                {
                    id: 'products',
                    title: 'List',
                    type: 'item',
                    url: '/app/products'
                }
            ]
        },
        {
            id: 'brands',
            title: 'Brands',
            type: 'collapse',
            icon: icons.IconBuilding,
            children: [
                {
                    id: 'brands',
                    title: 'List',
                    type: 'item',
                    url: '/app/brands'
                }
            ]
        }
    ]
};

export default admins;
