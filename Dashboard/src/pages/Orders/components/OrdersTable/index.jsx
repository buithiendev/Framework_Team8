import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Button from '~/components/Button';
import HighLight from '~/components/HighLight';
import styles from './OrderTable.module.scss';

const cx = classNames.bind(styles);

const columns = [
    { id: 'stt', label: '#', minWidth: 40, align: 'center' },
    {
        id: '_id',
        label: 'Code orders',
        minWidth: 20,
        align: 'left',
    },
    {
        id: 'InfoDelivery',
        label: 'Info Delivery',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'OrderDate',
        label: 'Order Date',
        minWidth: 80,
        align: 'center',
    },
    {
        id: 'TotalAmountOrdered',
        label: 'Total bill',
        minWidth: 40,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'StatusPayment',
        label: 'Status Payment',
        minWidth: 40,
        align: 'center',
    },
    {
        id: 'DeliveryMethod',
        label: 'Delivery Method',
        minWidth: 40,
        align: 'center',
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 30,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

function OrdersTable({ orders }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function createData(
        _id,
        orderDate,
        status,
        idInfoReceived,
        anothorInfo,
        products,
        TotalAmountOrdered,
        statusPayment,
        paymentMethod,
        sentDate,
        receivedDate,
        orderAccount,
        deliveryMethod,
    ) {
        const DeliveryMethod =
            deliveryMethod === 'atstore' ? 'At Store' : 'Home Delivery';
        const newOrderDate = new Date(orderDate);
        const InfoDelivery = (
            <>
                {idInfoReceived === null ? (
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label>Receiver: </label>
                            <p>{anothorInfo?.name}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Phone number: </label>
                            <p>{anothorInfo?.phone}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Email: </label>
                            <p>{anothorInfo?.email}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Address: </label>
                            <p>{anothorInfo?.address}</p>
                        </div>
                    </div>
                ) : (
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <label>Receiver: </label>
                            <p>{idInfoReceived?.name}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Phone number: </label>
                            <p>{idInfoReceived?.phone}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Email: </label>
                            <p>{idInfoReceived?.email}</p>
                        </div>
                        <div className={cx('info-item')}>
                            <label>Address: </label>
                            <p>{idInfoReceived?.address}</p>
                        </div>
                    </div>
                )}
            </>
        );

        const action = (
            <>
                <Button
                    smallest
                    primary
                    style={{ height: 25, fontSize: '1.2rem' }}
                    onClick={() => {
                        navigate(`detailorder/${_id}`);
                    }}
                >
                    View & Update
                </Button>
            </>
        );

        const OrderDate = (
            <p>
                {newOrderDate.getDate()}-{newOrderDate.getMonth()}-
                {newOrderDate.getFullYear()}
            </p>
        );

        const Status = (
            <HighLight
                small
                success={status !== 'Order has been cancelled'}
                error={status === 'Order has been cancelled'}
            >
                {status}
            </HighLight>
        );

        const StatusPayment = (
            <HighLight primary small>
                {statusPayment}
            </HighLight>
        );

        return {
            _id,
            TotalAmountOrdered,
            statusPayment,
            StatusPayment,
            Status,
            OrderDate,
            InfoDelivery,
            action,
            DeliveryMethod,
        };
    }

    function changeListProducts(orders) {
        return orders?.map((o) => {
            const {
                _id,
                orderDate,
                status,
                idInfoReceived,
                anothorInfo,
                products,
                TotalAmountOrdered,
                statusPayment,
                paymentMethod,
                sentDate,
                receivedDate,
                orderAccount,
                deliveryMethod,
            } = o;
            return createData(
                _id,
                orderDate,
                status,
                idInfoReceived,
                anothorInfo,
                products,
                TotalAmountOrdered,
                statusPayment,
                paymentMethod,
                sentDate,
                receivedDate,
                orderAccount,
                deliveryMethod,
            );
        });
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
                Width: '100%',
                overflow: 'hidden',
                marginTop: '24px',
            }}
        >
            <TableContainer sx={{ height: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {changeListProducts(orders)
                            ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            ?.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={uuidv4()}
                                    >
                                        {columns.map((column) => {
                                            let value;
                                            column.id === 'stt'
                                                ? (value = index + 1)
                                                : (value = row[column.id]);
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    fontSize: 16,
                    '& .MuiButtonBase-root': {
                        '& svg': {
                            fontSize: 25,
                        },
                    },
                }}
                rowsPerPageOptions={[8, 25, 100]}
                component="div"
                count={orders?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(OrdersTable);
