import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getOrderById } from '~/utils/orderRoute';
import styles from './PaymentTransfer.module.scss';

const cx = classNames.bind(styles);

const PaymentTransfer = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [bankSelect, setBankSelect] = useState('Vietcombank');
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

    const listBank = [
        {
            accountNumber: '1019223152',
            nameBank: 'Vietcombank',
            accountHolder: 'Bùi Thiện',
            linkqr: 'https://static.vecteezy.com/system/resources/previews/002/557/391/original/qr-code-for-scanning-free-vector.jpg',
        },
        {
            accountNumber: '5227205172910',
            nameBank: 'Agribank',
            accountHolder: 'Bùi Thiện',
            linkqr: 'https://banner2.cleanpng.com/20190721/ies/kisspng-qr-code-portable-network-graphics-computer-icons-t-free-qr-code-png-vector-download-2-png-amp-tr-5d3410f59da0c7.1344756315636933016457.jpg',
        },
        {
            accountNumber: '9999191919',
            nameBank: 'MB Bank',
            accountHolder: 'Bùi Thiện',
            linkqr: 'https://www.seekpng.com/png/detail/128-1285139_qr-code-qr-code-icon-png.png',
        },
        {
            accountNumber: '192557723',
            nameBank: 'Sacombank',
            accountHolder: 'Bùi Thiện',
            linkqr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/640px-QR_code_for_mobile_English_Wikipedia.svg.png',
        },
    ];

    const convertToVND = (money: Number) => {
        return money.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const InfoBank = ({ bank }) => {
        return (
            <div className={cx('info-bank')}>
                <span>
                    Số tài khoản: <p>{bank.accountNumber}</p>
                </span>
                <span>
                    Tên ngân hàng: <p>{bank.nameBank}</p>
                </span>
                <span>
                    Chủ tài khoản: <p>{bank.accountHolder}</p>
                </span>
            </div>
        );
    };

    const RenderInfoBank = () => {
        const bank = listBank.find((item) => item.nameBank === bankSelect);

        return <InfoBank bank={bank} />;
    };

    return (
        <div className={cx('container')}>
            <h2>Thực hiện thanh toán</h2>
            <div className={cx('wrapper')}>
                <p className={cx('desc')}>
                    Quý khách vui lòng lựa chọn ngân hàng để thực hiện chuyển
                    khoản
                </p>
                <div className={cx('list-bank')}>
                    <FormControl
                        sx={{
                            fontSize: '12px',
                            width: '100%',
                        }}
                    >
                        <RadioGroup
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem',
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="bank"
                            defaultValue="transfer"
                            onChange={(e) => {
                                setBankSelect(e.target.value);
                            }}
                        >
                            <FormControlLabel
                                value="Vietcombank"
                                control={<Radio />}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 24px',
                                    backgroundColor: 'rgb(233, 233, 233)',
                                    borderRadius: '8px',
                                }}
                                label={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItem: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                            }}
                                            src="https://static.wixstatic.com/media/9d8ed5_810e9e3b7fad40eca3ec5087da674662~mv2.png/v1/fill/w_1182,h_1182,al_c/9d8ed5_810e9e3b7fad40eca3ec5087da674662~mv2.png"
                                            alt=""
                                        />
                                        <label
                                            style={{
                                                margin: 'auto 0',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Vietcombank
                                        </label>
                                    </div>
                                }
                            />
                            <FormControlLabel
                                value="Agribank"
                                control={<Radio />}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 24px',
                                    backgroundColor: 'rgb(233, 233, 233)',
                                    borderRadius: '8px',
                                }}
                                label={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItem: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                            }}
                                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Agribank-V.png"
                                            alt=""
                                        />
                                        <label
                                            style={{
                                                margin: 'auto 0',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Agribank
                                        </label>
                                    </div>
                                }
                            />
                            <FormControlLabel
                                value="Sacombank"
                                control={<Radio />}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 24px',
                                    backgroundColor: 'rgb(233, 233, 233)',
                                    borderRadius: '8px',
                                }}
                                label={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItem: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                            }}
                                            src="https://static.wixstatic.com/media/9d8ed5_c1ff4912d7eb4f8b901802156088483d~mv2.png/v1/fill/w_1182,h_1182,al_c/9d8ed5_c1ff4912d7eb4f8b901802156088483d~mv2.png"
                                            alt=""
                                        />
                                        <label
                                            style={{
                                                margin: 'auto 0',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Sacombank
                                        </label>
                                    </div>
                                }
                            />
                            <FormControlLabel
                                value="MB Bank"
                                control={<Radio />}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 24px',
                                    backgroundColor: 'rgb(233, 233, 233)',
                                    borderRadius: '8px',
                                }}
                                label={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItem: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                            }}
                                            src="https://static.wixstatic.com/media/9d8ed5_b92082f54b6143f6bacafff11d0c1d98~mv2.png/v1/fill/w_1182,h_1182,al_c/9d8ed5_b92082f54b6143f6bacafff11d0c1d98~mv2.png"
                                            alt=""
                                        />
                                        <label
                                            style={{
                                                margin: 'auto 0',
                                                fontWeight: 600,
                                            }}
                                        >
                                            MB Bank
                                        </label>
                                    </div>
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <p className={cx('note')} style={{textAlign: 'center'}}>
                    Sau khi chuyển khoản thành công! Nhân viên sẽ liên lạc cho bạn trong vòng 1 ngày trừ thứ 7 và Chủ Nhật
                </p>
                <img
                    className={cx('qr-code')}
                    src="https://static.vecteezy.com/system/resources/previews/002/557/391/original/qr-code-for-scanning-free-vector.jpg"
                    alt=""
                />
                <RenderInfoBank />
                <div className={cx('info-bank')}>
                    <span>
                        Thông tin chuyển khoản:
                        <p>
                            {order &&
                                (order.idInfoReceived === null
                                    ? order.anothorInfo.name +
                                      ' ' +
                                      order.anothorInfo.phone
                                    : order.idInfoReceived.name +
                                      ' ' +
                                      order.idInfoReceived.phone)}
                        </p>
                    </span>
                    <span>
                        Số tiền :{' '}
                        <p>{order && convertToVND(order.TotalAmountOrdered)}</p>
                    </span>
                </div>
                <p className={cx('note')}>
                    Lưu ý: Quý khách vui lòng chuyển khoản đúng vào số tài khoản
                    trên. Nội dung chuyển khoản chính xác theo hướng dẫn để nhận
                    được thông báo về giao dịch.
                </p>
                
            </div>
        </div>
    );
};

export default PaymentTransfer;
