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

const sellers = {
    id: 'seller',
    title: 'Seller',
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
                },
                {
                    id: 'products-create',
                    title: 'Create',
                    type: 'item',
                    url: '/app/products/create'
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
                    title: 'My Brand',
                    type: 'item',
                    url: '/app/brands/my-brand'
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
        }
    ]
};

export default sellers;
