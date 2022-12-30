import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBarItem({ title, path, icon, onClick, moreElement, active }) {
    return (
        <div
            className={cx('sidebar__item', active ? 'active' : '')}
            onClick={onClick}
        >
            <Link to={path}>
                <span className={cx('icon')}>{icon}</span>
                <span className={cx('title')}>{title}</span>
                {moreElement && (
                    <div className={cx('more-element')}>{moreElement}</div>
                )}
            </Link>
        </div>
    );
}

export default SideBarItem;
