import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { BiLocationPlus, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import logoFb from '~/assets/images/fb-logo.png';
import logoMess from '~/assets/images/mess-logo.png';
import logoZalo from '~/assets/images/zalo-icon.png';
import styles from './Footer.module.scss';
import { getCategoriesActive } from '~/utils/categoriesRoute';

const cx = classNames.bind(styles);

const infos = [
    { label: 'Giới thiệu', path: '/' },
    { label: 'Khuyến mãi', path: '/' },
    { label: 'Bảo hành và sữa chữa', path: '/' },
    { label: 'Tuyển dụng', path: '/' },
    { label: 'Tin tức', path: '/' },
    { label: 'Check IMEI', path: '/' },
    { label: 'Phương thức thanh toán', path: '/' },
    { label: 'Gửi góp ý, Khiếu nại', path: '/' },
];

const policy = [
    { label: 'Trả góp', path: '' },
    { label: 'Giao hàng', path: '' },
    { label: 'Hủy giao dịch', path: '' },
    { label: 'Đổi trả', path: '' },
    { label: 'Bảo hành', path: '' },
    { label: 'Giải quyết khiếu nại', path: '' },
    { label: 'Bảo mật thông tin', path: '' },
];

function Footer() {
    const [products, setProduct] = useState();

    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            const res = await axios.get(getCategoriesActive);
            if (res.data && !unsubcribed) setProduct(res.data);
        })();

        return () => {
            unsubcribed = true;
        };
    },[])

    return (
        <footer className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('nav')}>
                    <div className={cx('intro-company')}>
                        <h4>Death Shop</h4>
                        <p className={cx('desc')}>
                            Năm 2022, Death trở thành đại lý ủy quyền của Apple.
                            Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và
                            Apple Store nhằm mang đến trải nghiệm tốt nhất về
                            sản phẩm và dịch vụ của Apple cho người dùng Việt
                            Nam.
                        </p>
                        <div className={cx('socials')}>
                            <a href="https://www.facebook.com/buithiendev/">
                                <img alt="" src={logoFb} />
                            </a>
                            <a href="https://zalo.me/0357748844">
                                <img alt="" src={logoZalo} />
                            </a>
                            <a href="https://www.facebook.com/buithiendev/">
                                <img alt="" src={logoMess} />
                            </a>
                        </div>
                    </div>
                    <div className={cx('col', 'products')}>
                        <h3>Products</h3>
                        {products && products.map((product, index) => {
                            return (
                                <Link key={index} to={`/shop/${product.id}`}>
                                    <span>{product.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={cx('col', 'info')}>
                        <h3>Information</h3>
                        {infos.map((product, index) => {
                            return (
                                <Link key={index}>
                                    <span>{product.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={cx('col', 'policy')}>
                        <h3>Policy</h3>
                        {policy.map((product, index) => {
                            return (
                                <Link key={index}>
                                    <span>{product.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={cx('col', 'contacts')}>
                        <h3>Contact</h3>
                        <div className={cx('col-item')}>
                            <BiPhoneCall />
                            +84357748844
                        </div>
                        <div className={cx('col-item')}>
                            <BiLocationPlus />
                            UIT, Khu phố 6
                        </div>
                        <div className={cx('col-item')}>
                            <BiMailSend />
                            buithien.dev@gmail.com
                        </div>
                    </div>
                </div>
                <div className={cx('copyright')}>
                    <p>
                        Copyright 2022 - Developer by Death Team. All rights
                        reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
