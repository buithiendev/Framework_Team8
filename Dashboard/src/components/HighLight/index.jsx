import classNames from 'classnames/bind';
import styles from './HighLight.module.scss';

const cx = classNames.bind(styles);

function HighLight({
    children,
    type,
    style,
    loader,
    outline = false,
    primary = false,
    success = false,
    error = false,
    small = false,
    large = false,
    text = false,
    rounded = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('wrapper', {
        primary,
        success,
        outline,
        error,
        small,
        large,
        text,
        disabled,
        rounded,
        [className]: className,
    });

    return (
        <div className={classes} {...props}>
            <span className={cx('title')}>{children}</span>
        </div>
    );
}

export default HighLight;
