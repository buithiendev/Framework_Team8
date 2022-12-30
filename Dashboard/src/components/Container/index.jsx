import classNames from 'classnames/bind';
import styles from './Container.module.scss';

const cx = classNames.bind(styles);

function Container({ children, style }) {
    return (
        <div style={style} className={cx('container')}>
            {children}
        </div>
    );
}

export default Container;
