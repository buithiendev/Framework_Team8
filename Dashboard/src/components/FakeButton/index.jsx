import { CircularProgress } from '@mui/material';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function FakeButton({
    to,
    href,
    children,
    type,
    style,
    loader,
    outline = false,
    primary = false,
    small = false,
    smallest = false,
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
    let Comp = 'div';
    const props = {
        onClick,
        ...passProps,
    };

    // remove event listeners when button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        smallest,
        large,
        text,
        disabled,
        rounded,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props} type={type} style={style}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {loader ? <CircularProgress size={25} color="inherit"/> : <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default FakeButton;
