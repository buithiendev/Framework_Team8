import { Divider } from '@mui/material';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './SubTotal.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SubTotal({ listProduct = [] }) {
    const navigate = useNavigate()
    const totalPrice = listProduct
        .reduce((total, curr) => {
            return total + curr?.colorSelect?.priceColor * 1;
        }, 0)
        .toLocaleString('vi', { style: 'currency', currency: 'VND' });

    return (
        <div className={cx('sub-total')}>
            <div className={cx('discount-code')}>
                <input
                    placeholder="Discount code
"
                    type="text"
                />
                <Button primary>Apply</Button>
            </div>
            <div className={cx('price-details')}>
                <div className={cx('price-item')}>
                    <label>Initial price:</label>
                    <p>{totalPrice}</p>
                </div>
                <div className={cx('price-item')}>
                    <label>VAT:</label>
                    <p>0 ₫</p>
                </div>
                <div className={cx('price-item')}>
                    <label style={{ fontWeight: 600 }}>Total price</label>
                    <p style={{ color: '#3977CE' }}>{totalPrice}</p>
                </div>
            </div>
            <Divider />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Button primary>Payment</Button>
                <Button onClick={() => navigate(-1)} style={{margin: 0}} outline>Back to the shop</Button>
            </div>
        </div>
    );
}

export default SubTotal;
