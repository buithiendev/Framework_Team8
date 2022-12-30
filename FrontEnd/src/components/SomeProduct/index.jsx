import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import CardProduct from '~/components/CardProduct';
import { getProductByCateId } from '~/utils/productsRoute';
import styles from './SomeProduct.module.scss';

const cx = classNames.bind(styles);

function SomeProduct({ category }) {
    const [products, setProducts] = useState();

    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            const res = await axios.get(
                `${getProductByCateId}/${category._id}`,
            );
            if (res.data && !unsubcribed) {
                setProducts(res.data);
            }
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <div className={cx('container')}>
            <h3 className={cx('category-name')}>{category.name}</h3>
            {products && (
                <div className={cx('products-preview')}>
                    {products.map((product, index) => {
                        if (index < 4)
                            return (
                                <CardProduct key={index} product={product} />
                            );
                    })}
                </div>
            )}
            <Button
                to={`/shop/${category.id}`}
                style={{
                    marginTop: '24px',
                    fontSize: 14,
                }}
                outline
            >
                Xem tất cả sản phẩm {category.name}
            </Button>
        </div>
    );
}

export default SomeProduct;
