import classNames from 'classnames/bind';
import { BiSearch } from 'react-icons/bi';
import avatar from '~/assets/images/0_0_13.png';
import styles from './Header.module.scss';
import NotificationBubble from './NotificationBubble';
import UserOptions from './UserOptions';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('header-wrap')}>
                <div className={cx('header-left')}>
                    <div className={cx('header-search')}>
                        <input type="text" placeholder="Search product ..." />
                        <BiSearch />
                    </div>
                </div>
                <div className={cx('header-right')}>
                    <NotificationBubble />
                    <div className={cx('quick-view')}>
                        <UserOptions avatar={avatar}></UserOptions>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
