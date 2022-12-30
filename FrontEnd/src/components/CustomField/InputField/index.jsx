import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

function InputField(props) {
    const { field, form, type, label, placeholder, disabled, icon, required } =
        props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div className={cx('input-field__group')}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <section>
                <input
                    id={name}
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    disabled={disabled}
                    className={cx(
                        disabled ? cx('disabled') : '',
                        showError ? cx('valid__error') : '',
                        !icon ? cx('is-icon') : '',
                    )}
                />
                {icon}
            </section>
            {showError && (
                <p className={cx('validate__error')}>{errors[name]}</p>
            )}
        </div>
    );
}

export default InputField;
