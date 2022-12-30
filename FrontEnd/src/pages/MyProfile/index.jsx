import axios from 'axios';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiFoodMenu, BiLocationPlus, BiLock, BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import { customer } from '~/utils/customerRoute';
import ChangePassword from './components/ChangePassword';
import FormAddress from './components/FormAddress';
import FormInfo from './components/FormInfo';
import OrderHistory from './components/OrderHistory';
import styles from './MyProfile.module.scss';

const cx = classNames.bind(styles);

const MyProfile = () => {
    const dispatch = useDispatch();
    const { status, info } = useSelector((state) => state.currentUser);

    const navList = [
        { icon: <BiUser size={20} />, name: 'Account information' },
        { icon: <BiLocationPlus size={20} />, name: 'Delivery address' },
        { icon: <BiFoodMenu size={20} />, name: 'Order history' },
        { icon: <BiLock size={20} />, name: 'Change password' },
    ];
    const [selectNavigate, setSelectNavigate] = useState('Account information');

    const NavItem = ({ nav }) => {
        return (
            <div
                className={cx(
                    'nav-item',
                    selectNavigate === nav.name ? 'active' : '',
                )}
                onClick={() => setSelectNavigate(nav.name)}
            >
                {nav.icon} <span>{nav.name}</span>
            </div>
        );
    };

    if (!status) {
        (async () => {
            try {
                const { data } = await axios.get(customer);
                if (!data) {
                } else {
                    dispatch(setInfoCurrentUser(data));
                }
            } catch (ex) {}
        })();
    }

    const RenderSwitch = () => {
        switch (selectNavigate) {
            case 'Account information':
                return <FormInfo />;
            case 'Delivery address':
                return <FormAddress />;
            case 'Order history':
                return <OrderHistory />;
            case 'Change password':
                return <ChangePassword />;
            default:
                return <FormInfo />;
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrap')}>
                <div>
                    <div className={cx('navigate')}>
                        {navList.map((nav, index) => {
                            return <NavItem key={index} nav={nav} />;
                        })}
                    </div>
                </div>
                <div className={cx('features')}>
                    <RenderSwitch />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyProfile;
