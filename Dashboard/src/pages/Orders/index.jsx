import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import OrdersTable from './components/OrdersTable';
import styles from './Orders.module.scss';

const cx = classNames.bind(styles);

const filterOrders = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'comfimred', label: 'Comfimred' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'delivering', label: 'Delivering' },
];

function Orders() {
    const orders = useSelector((state) => state.orders.orders);
    const [filter, setFilter] = useState(filterOrders[0]);
    const [orderAfterFilter, setOrderAffterFilter] = useState(orders);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setOrderAffterFilter(orders);
    }, [orders]);

    useEffect(() => {
        (async () => {
            switch (filter.value) {
                case 'pending':
                    const ordersPending = orders.filter(
                        (order) => order.status === 'Pending',
                    );
                    setOrderAffterFilter(ordersPending);
                    break;
                case 'comfimred':
                    const ordersConfirmed = orders.filter(
                        (order) => order.status === 'Payment Confirmed',
                    );
                    setOrderAffterFilter(ordersConfirmed);
                    break;
                case 'unpaid':
                    const ordersUnpaid = orders.filter(
                        (order) => order.statusPayment === 'Pending',
                    );
                    setOrderAffterFilter(ordersUnpaid);
                    break;
                case 'canceled':
                    const ordersCaneled = orders.filter(
                        (order) => order.status === 'Order has been cancelled',
                    );
                    setOrderAffterFilter(ordersCaneled);
                    break;
                case 'delivering':
                    const ordersDelivering = orders.filter(
                        (order) => order.status === 'Order sent',
                    );
                    setOrderAffterFilter(ordersDelivering);
                    break;
                default:
                    setOrderAffterFilter(orders);
                    break;
            }
        })();
    }, [filter]);

    const handleSearchOrder = () => {
        const key = search.trim();
        const newList = orders.filter((order) => {
            return (
                (
                    order?.anothorInfo !== null && order?.idInfoReceived?.name
                )?.includes(key) ||
                (
                    order?.anothorInfo !== null && order?.idInfoReceived?.email
                )?.includes(key) ||
                (
                    order?.anothorInfo !== null && order?.idInfoReceived?.phone
                )?.includes(key) ||
                (
                    order?.anothorInfo !== null && order?.anothorInfo?.name
                )?.includes(key) ||
                (
                    order?.anothorInfo !== null && order?.anothorInfo?.email
                )?.includes(key) ||
                (
                    order?.anothorInfo !== null && order?.anothorInfo?.phone
                )?.includes(key) ||
                order?._id?.includes(key)
            );
        });
        setOrderAffterFilter(newList);
    };

    return (
        <Container
            style={{
                height: '100%',
                margin: '0 40px',
                paddingTop: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderChild title="Orders"></HeaderChild>
            <div className={cx('filters')}>
                <Select
                    className={cx('select')}
                    value={filter}
                    isSearchable={false}
                    onChange={(e) => {
                        setFilter(e);
                    }}
                    options={filterOrders}
                />
                <div className={cx('filters')}>
                    <input
                        className={cx('search')}
                        type="text"
                        value={search}
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        primary
                        leftIcon={<BiSearch />}
                        onClick={handleSearchOrder}
                    />
                </div>
            </div>
            <OrdersTable orders={orderAfterFilter} />
        </Container>
    );
}

export default Orders;
