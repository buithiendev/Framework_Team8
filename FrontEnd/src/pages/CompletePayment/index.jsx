import { Divider } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from '~/components/Button';
import { getOrderById } from '~/utils/orderRoute';
import styles from './CompletePayment.module.scss';

const cx = classNames.bind(styles);

const CompletePayment = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${getOrderById}/${params.id}`);

            if (response?.data) {
                setOrder(response.data);

                console.log(response.data);
            } else {
                navigate('/');
            }
        })();
    }, []);

    const convertToVND = (money: Number) => {
        return money.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const ProductItem = (p) => {
        return (
            <div className={cx('product-item')}>
                <div className={cx('info')}>
                    <h4>{p.product.name}</h4>
                    <div className={cx('info-detail')}>
                        {p.product.memorys && (
                            <span>Memory storage: {p.product.memorys}</span>
                        )}
                        {p.product.rams && <span>RAM: {p.product.rams}</span>}
                        {p.product.colorSelect && (
                            <span>
                                Color: {p.product.colorSelect?.nameColor}
                            </span>
                        )}
                    </div>
                </div>
                <span className={cx('quantity')}>Qt: 1</span>
            </div>
        );
    };

    return (
        <>
            {order && (
                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <h2>Order details</h2>
                        <div className={cx('info-order')}>
                            <div className={cx('info-group')}>
                                <div className={cx('info-row')}>
                                    <label>Code orders:</label>
                                    <p>#{order._id}</p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Order date:</label>
                                    <p>{order.orderDate}</p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Status:</label>
                                    <p style={{ color: 'green' }}>
                                        {order.status}
                                    </p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Customer name:</label>
                                    <p>
                                        {order.idInfoReceived !== null
                                            ? order.idInfoReceived?.name
                                            : order.anothorInfo?.name}
                                    </p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Phone number:</label>
                                    <p>
                                        {order.idInfoReceived !== null
                                            ? order.idInfoReceived?.phone
                                            : order.anothorInfo?.phone}
                                    </p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Email:</label>
                                    <p>
                                        {order.idInfoReceived !== null
                                            ? order.idInfoReceived?.email
                                            : order.anothorInfo?.email}
                                    </p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Delivery Method:</label>
                                    <p>
                                        {order?.deliveryMethod === 'atstore'
                                            ? 'At Store'
                                            : 'Home Delivery'}
                                    </p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Delivery address:</label>
                                    <p>
                                        {order?.deliveryMethod !== 'atstore'
                                            ? order.anothorInfo != null
                                                ? order.anothorInfo.address
                                                : order.storeAddress
                                                      ?.specificAddress
                                            : order?.storeAddress.address}
                                    </p>
                                </div>
                            </div>
                            <Divider />
                            <div className={cx('info-group')}>
                                <div className={cx('info-row')}>
                                    <label>Payment method:</label>
                                    <p>{order.paymentMethod}</p>
                                </div>
                                <div className={cx('info-row')}>
                                    <label>Status payment:</label>
                                    <p style={{ color: 'green' }}>
                                        {order.statusPayment}
                                    </p>
                                </div>
                            </div>
                            <Divider />
                            <div className={cx('info-group')}>
                                <label>Products</label>
                                {order.products.map((p, index) => {
                                    return (
                                        <ProductItem key={index} product={p} />
                                    );
                                })}
                            </div>
                            <Divider />
                            <div className={cx('info-group')}>
                                <div
                                    className={cx('info-row')}
                                    style={{ gridTemplateColumns: '1fr 1fr' }}
                                >
                                    <label>Total amount ordered:</label>
                                    <p
                                        style={{
                                            fontSize: '2rem',
                                            color: '#0066CC',
                                        }}
                                    >
                                        {convertToVND(order.TotalAmountOrdered)}
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    to={`/checkout/localbankpaymentinfo/${order._id}`}
                                    primary
                                >
                                    Payment
                                </Button>
                                <Button to="/" outline>
                                    Back to the shop
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompletePayment;
