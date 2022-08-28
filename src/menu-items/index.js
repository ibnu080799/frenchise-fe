import useProfile from 'hooks/useProfile';
import admins from './admins';
import sellers from './sellers';

// ==============================|| MENU ITEMS ||============================== //

const MenuItems = () => {
    const [profile] = useProfile();

    return {
        items: [profile.role === 'admin' ? admins : sellers]
    };
};

export default MenuItems;
