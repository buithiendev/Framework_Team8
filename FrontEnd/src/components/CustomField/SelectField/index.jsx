import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Select from 'react-select';
import styles from './SelectField.module.scss';

const cx = classNames.bind(styles);

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    options: [],
    label: '',
    placeholder: '',
    disabled: false,
};

function SelectField(props) {
    const [load, setLoad] = useState(false);
    const {
        field,
        form,
        options,
        label,
        placeholder,
        disabled,
        required,
        onChange,
        isSearchable = false,
    } = props;
    const { name, value } = field;

    const selectedOption =
        options.find((option) => {
            return option.value === value;
        }) || options[0];
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption
            ? selectedOption.value
            : selectedOption;
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };

        onChange && onChange(selectedOption);
        field.onChange(changeEvent);
    };

    const customStyles = {
        control: () => ({
            cursor: 'pointer',
            display: 'flex',
            height: '50px',
            width: '100%',
            border: '1px solid #e6e6e6',
            borderRadius: '10px',
            backgroundColor: 'var(--white-color)',
            padding: '0 10px 0 10px ',
            fontSize: '1.5rem',
        }),
    };

    return (
        <div className={cx('wrap')}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <Select
                styles={customStyles}
                id={name}
                {...field}
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
                isDisabled={disabled}
                options={options}
                isSearchable={isSearchable}
            />
            {showError && (
                <p className={cx('validate__error')}>{errors[name]}</p>
            )}
        </div>
    );
}

export default SelectField;
