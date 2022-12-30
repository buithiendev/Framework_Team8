import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import '~/assets/css/common.css';
import FakeButton from '~/components/FakeButton';
import styles from './SelectMultiField.module.scss';
import TableColor from './TableColor';

const cx = classNames.bind(styles);

const ColorField = (props) => {
    const {
        field,
        form,
        options = [],
        label,
        placeholder,
        disabled,
        required,
        mode,
    } = props;
    const { name, value } = field;
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = options.filter(
        (option) => !selectedItems.includes(option),
    );
    const [nameColor, setNameColor] = useState('');
    const [priceColor, setPriceColor] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [message, setMassage] = useState('');
    const [load, setLoad] = useState(true);
    const [isEdit, setIsEdit] = useState(-1);

    useEffect(() => {
        setSelectedItems(value);
    }, []);

    const handleOnChange = (value) => {
        setSelectedItems(value);
        form.setFieldValue(field.name, Array.from(value));
    };

    const changeNameColor = (e) => {
        setNameColor(e.target.value);
        setMassage('');
    };

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
        setMassage('');
    };

    const handleAddColor = () => {
        if (nameColor && priceColor) {
            if(isEdit !== -1) {
                value[isEdit] = {nameColor, priceColor, quantity}
                setIsEdit(-1);
            } else {
                value.push({ nameColor, priceColor, quantity });
            }
            form.setFieldValue(field.name, value);
            setSelectedItems(value);
            setNameColor('');
            setPriceColor('');
            setQuantity(0);
        } else {
            setMassage(
                nameColor
                    ? 'Vui lòng nhập giá sản phẩm cho màu này!'
                    : 'Vui lòng nhập màu sắc!',
            );
        }
    };

    const handleDeleteColor = (index) => {
        value?.splice(index, 1);
        form.setFieldValue(field.name, value);
        setLoad(!load);
    };

    const editColor = (index) => {
        setIsEdit(index)
        setNameColor(value[index]?.nameColor)
        setPriceColor(value[index]?.priceColor)
        setQuantity(value[index]?.quantity)
    }

    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            {value && (
                <TableColor colors={value} handleDelete={handleDeleteColor} editColor={editColor}/>
            )}
            <div className={cx('color-group')}>
                <div>
                    <label htmlFor="name-color">Màu sắc</label>
                    <input
                        id="name-color"
                        value={nameColor}
                        onChange={changeNameColor}
                    />
                </div>
                <div>
                    <label htmlFor="price-color">Giá</label>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Price"
                        value={priceColor}
                        decimalsLimit={2}
                        onValueChange={(value, name) =>{
                            setPriceColor(value)
                            setMassage('')
                        }
                        }
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Số lượng</label>
                    <input
                        id="quantity"
                        value={quantity}
                        onChange={changeQuantity}
                    />
                </div>
                <FakeButton primary smallest onClick={handleAddColor}>
                    {isEdit !== -1 ? 'Cập Nhật' : 'Thêm'}
                </FakeButton>
                {message && <p className={cx('message-valid')}>{message}</p>}
            </div>
        </div>
    );
};

export default ColorField;
