import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './CardProduct.module.scss';

const cx = classNames.bind(styles);

function CardProduct({ product }) {
    const navigate = useNavigate();
    const { linksImage, name, newPrice, sticker, rams, memorys } = product;

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const handleClickProduct = (productID) => {
        navigate(`/product/${productID}`);
    };

    return (
        <div
            className={cx('container')}
            onClick={() => handleClickProduct(product.id)}
        >
            {sticker && <div className={cx('stickers')}>{sticker}</div>}
            <img className={cx('thumb')} src={linksImage[0]} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('product-name')}>
                    {name +
                        (rams ? `  ${rams}` : '') +
                        (memorys ? `  ${memorys}` : '')}
                </h4>
                <div className={cx('price-group')}>
                    <p className={cx('price', 'new')}>
                        {convertToVND(newPrice)}
                    </p>
                    <p className={cx('price', 'old')}>
                        {convertToVND(newPrice)}
                    </p>
                </div>
                <p className={cx('subtitle')}>Mua ngay không cần cọc</p>
            </div>
        </div>
    );
}

export default CardProduct;
