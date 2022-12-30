import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { getHistoryInvoice } from '~/utils/orderRoute';
import styles from '../MyProfile.module.scss';

const cx = classNames.bind(styles);

const OrderHistory = () => {
    const { status, info } = useSelector((state) => state.currentUser);
    const [histories, setHistories] = useState();

    useEffect(() => {
        (async () => {
            if (info) {
                const response = await axios.get(
                    `${getHistoryInvoice}/${info._id}`,
                );
                setHistories(response.data);
            }
        })();
    }, []);

    const HistoryItem = ({ order }) => {
        console.log(order);
        return (
            <div className={cx('history-item')}>
                <div className={cx('info')}>
                    <div className={cx('info-row')}>
                        <label>Mã đơn hàng: </label>
                        <p>{order._id}</p>
                    </div>
                    <div className={cx('info-row')}>
                        <label>Ngày đặt hàng: </label>
                        <p>{order.orderDate}</p>
                    </div>
                    <div className={cx('info-row')}>
                        <label>Tổng tiền: </label>
                        <p>{order.TotalAmountOrdered}</p>
                    </div>
                    <div className={cx('info-row')}>
                        <label>Phương thức thanh toán: </label>
                        <p>Thanh toán chuyển khoản</p>
                    </div>
                    <Link to={`/shoppingcart/completed/${order._id}`}>
                        Xem chi tiết
                    </Link>
                </div>
                <div>
                    <Button
                        primary={order.status !== 'Order has been cancelled'}
                        error={order.status === 'Order has been cancelled'}
                        style={{ fontSize: '1.3rem' }}
                        small
                    >
                        {order.status}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className={cx('histories')}>
            {histories &&
                histories?.map((his, index) => {
                    return <HistoryItem order={his} key={index} />;
                })}
        </div>
    );
};

export default OrderHistory;
