import {Select} from 'antd'
import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './SelectMultiField.module.scss';

const cx = classNames.bind(styles);

const SelectMultiField = (props) => {
    const { field, form, options=[], label, placeholder, disabled, required, mode } = props;
    const { name, value } = field;
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = options.filter((option) => !selectedItems.includes(option));

    useEffect(() => {
        setSelectedItems(value)
    },[])

    const handleOnChange = (value) => {
        setSelectedItems(value)
        form.setFieldValue(field.name,(Array.from(value)));
    }

    return (
        <div>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <Select
                size="large"
                mode={mode}
                id={name}
                {...field}
                disabled={disabled}
                placeholder={placeholder}
                value={selectedItems}
                onChange={handleOnChange}
                style={{ width: '100%' }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />
        </div>
    );
};

export default SelectMultiField;
