import classNames from 'classnames/bind';
import styles from './HeaderChild.module.scss';

const cx = classNames.bind(styles);

function HeaderChild({ children, title, style, small, large=true, className }) {
    const classes = cx('header', {
        small,
        large,
        [className]: className,
    });

    return (
        <div className={classes} style={style}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('feature')}>{children}</div>
        </div>
    );
}

export default HeaderChild;
