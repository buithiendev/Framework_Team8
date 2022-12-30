import classNames from 'classnames/bind';
import styles from './Paper.module.scss';

const cx = classNames.bind(styles);

function Paper({children, style}) {
    return <div className={cx('wrap')} style={style}>{children}</div>;
}

export default Paper;
