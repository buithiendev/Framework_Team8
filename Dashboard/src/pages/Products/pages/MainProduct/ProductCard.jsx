import classNames from 'classnames/bind';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import Button from '~/components/Button';
import styles from './MainProduct.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ product, handleDeleteProduct }) {
    const navigate = useNavigate();
    const { linksImage, name, newPrice, sticker } = product;

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const handleEdit = () => {
        navigate(`edit/${product.id}`)
    };

    return (
        <div className={cx('container')}>
            {sticker && <div className={cx('stickers')}>{sticker}</div>}
            <img className={cx('thumb')} src={linksImage[0]} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('product-name')}>{name}</h4>
                <p className={cx('price')}>{convertToVND(newPrice)}</p>
                <p className={cx('subtitle')}>Mua ngay không cần cọc</p>
            </div>
            <div className={cx('action')}>
                <div>
                    <Button
                        small
                        primary
                        leftIcon={<BiEdit />}
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        small
                        outline
                        leftIcon={<BiTrash />}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
