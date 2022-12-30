import {
    BiAddToQueue,
    BiBox,
    BiCartAlt,
    BiCategory,
    BiCheckShield,
    BiGridAlt,
    BiGroup,
    BiHome,
    BiImages,
    BiUser,
} from 'react-icons/bi';

export const sideBars = [
    { title: 'Dashboard', path: '/', icon: <BiGridAlt /> },
    { title: 'Your Profile', path: '/profile', icon: <BiUser /> },
    { title: 'Users', path: '/users', icon: <BiGroup /> },
    { title: 'Products', path: '/products', icon: <BiBox /> },
    { title: 'Add Products', path: '/products/add', icon: <BiAddToQueue /> },
    { title: 'Categories', path: '/categories', icon: <BiCategory /> },
    { title: 'Orders', path: '/orders', icon: <BiCartAlt /> },
    { title: 'Banner', path: '/banner', icon: <BiImages /> },
    {
        title: 'Warranty Check',
        path: '/warrantycheck',
        icon: <BiCheckShield />,
    },
    { title: 'Stores', path: '/stores', icon: <BiHome /> },
];
