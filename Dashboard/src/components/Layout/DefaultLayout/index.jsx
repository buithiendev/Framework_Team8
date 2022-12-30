import classNames from 'classnames/bind';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout(props) {
    return (
        <div className={cx('default__layout')}>
            <SideBar />
            <div className={cx('container')}>
                <Header />
                <div className={cx('content')}>{props.children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
