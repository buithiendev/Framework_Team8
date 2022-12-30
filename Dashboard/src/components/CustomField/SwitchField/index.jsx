import { Switch } from '@mui/material';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SwitchField.module.scss';

const cx = classNames.bind(styles);

SwitchField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

SwitchField.defaultProps = {
    label: '',
    disabled: false,
};

function SwitchField(props) {
    const { field, label, disabled, required, defaultChecked } = props;
    const { name } = field;

    const handleSwitchChange = (e) => {
        const changeEvent = {
            target: {
                name: name,
                value: e.target.checked,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <div className={cx('switch-field__group')}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <Switch
                id={name}
                {...field}
                defaultChecked={defaultChecked}
                onChange={handleSwitchChange}
                disabled={disabled}
            />
        </div>
    );
}

export default SwitchField;
