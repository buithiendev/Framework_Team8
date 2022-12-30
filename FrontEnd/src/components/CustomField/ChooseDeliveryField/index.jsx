import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ChooseDeliveryField.module.scss';

const cx = classNames.bind(styles);

const ChooseDeliveryField = (props) => {

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

    const handleOnChange = (e) => {
        const changeEvent = {
            target: {
                name: name,
                value: e.target.value,
            },
        };

        field.onChange(changeEvent);
    }

    return (
        <div className={cx('choose-delivery')}>
            <label className={cx('label-form')}>Delivery form</label>
            <FormControl sx={{ fontSize: '12px' }}>
                <RadioGroup
                    id={name}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={name}
                    defaultValue={value}
                    onChange={handleOnChange}
                >
                    <FormControlLabel
                        value="atstore"
                        control={<Radio />}
                        label="At Store"
                    />
                    <FormControlLabel
                        
                        value="homedelivery"
                        control={<Radio />}
                        label="Home delivery"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default ChooseDeliveryField;
