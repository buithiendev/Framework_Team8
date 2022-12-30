import { Divider, Rating } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addItem } from '~/app/cartSlice';
import Button from '~/components/Button';
import { getProductByIdName, getProductByName } from '~/utils/productsRoute';
import DetailsProduct from './components/DetailsProduct/index';
import ImagePreview from './components/ImagePreview';
import PromotionInfo from './components/PromotionInfo/index';
import Variants from './components/Variants';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState();
    const [similarProducts, setSimilarProducts] = useState([]);
    const [colorSelected, setColorSelected] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let unsubcribed = false;

        (async () => {
            const response = await axios.get(
                `${getProductByIdName}/${params.id}`,
            );
            if (!response.data) navigate('/not-found');
            if (response.data && !unsubcribed) {
                setProduct(response.data);
                setColorSelected(response.data.colors[0]);
            }
        })();

        return () => {
            unsubcribed = true;
        };
    }, [params]);

    useEffect(() => {
        (async () => {
            if (product) {
                const response = await axios.get(
                    `${getProductByName}/${product.name}/${product.id}`,
                );

                if (response?.data) setSimilarProducts(response.data);
            }
        })();
    }, [product]);

    const chooseColor = (color) => {
        setColorSelected(color);
    };

    const handleBuyProduct = (productSelected, colorSelected) => {
        dispatch(addItem({ product: productSelected._id, colorSelected }));
        navigate('/customer/cart');
    };

    const handleAddProductToCart = (productSelected, colorSelected) => {
        dispatch(addItem({ product: productSelected._id, colorSelected }));
    };

    const Path = (p) => {
        return (
            <div className={cx('path')}>
                <Link to="/">Home</Link>
                <Link to={`/${p.product?.categoryIdName}`}>
                    <BiChevronRight />
                    {p.product?.categoryIdName}
                </Link>
                <Link to={`/shop/${p.product?.categoryIdName}`}>
                    <BiChevronRight />
                    {p.product?.seriesIdName}
                </Link>
                <Link to={`/product/${p.product?.id}`}>
                    {' '}
                    <BiChevronRight /> {p.product?.id}
                </Link>
            </div>
        );
    };

    return (
        <div className={cx('container')}>
            {product && (
                <div className={cx('wrapper')}>
                    <Path product={product} />
                    <div className={cx('view-product')}>
                        <div className={cx('left')}>
                            <ImagePreview linksImage={product.linksImage} />
                        </div>
                        <div className={cx('right')}>
                            <h3 className={cx('product-name')}>
                                {product.name +
                                    (product.rams ? ` - ${product.rams}` : '') +
                                    (product.memorys
                                        ? ` - ${product.memorys}`
                                        : '')}
                            </h3>
                            <div className={cx('rating')}>
                                <Rating
                                    size="large"
                                    name="read-only"
                                    value={5}
                                    readOnly
                                />
                                <a href="#write-rating">Đánh giá</a>
                            </div>
                            <Divider />

                            <Variants
                                basicPrice={product.newPrice}
                                similarProducts={similarProducts}
                                rams={product.rams}
                                memorys={product.memorys}
                                colors={product.colors}
                                id={product.id}
                                chooseColor={chooseColor}
                            />
                            <div className={cx('buy-btns')}>
                                <Button
                                    sx={{ width: 300 }}
                                    primary
                                    style={{
                                        backgroundColor: '#3977CE',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                    onClick={() => {
                                        handleBuyProduct(
                                            product,
                                            colorSelected,
                                        );
                                    }}
                                >
                                    Mua Ngay
                                </Button>
                                <Button
                                    outline
                                    style={{
                                        color: '#3977CE',
                                        borderColor: '#3977CE',
                                    }}
                                    onClick={() => {
                                        handleAddProductToCart(
                                            product,
                                            colorSelected,
                                        );
                                    }}
                                >
                                    <FaCartPlus
                                        style={{
                                            marginRight: 10,
                                        }}
                                    />{' '}
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                            <PromotionInfo
                                promotionInfo={product.promotionInfo}
                            />
                        </div>
                    </div>
                    <DetailsProduct
                        description={product.description}
                        specifications={product.specifications}
                        detailsProduct={product.detailsProduct}
                    />
                    <div id="write-rating"></div>
                </div>
            )}
        </div>
    );
}

export default Product;
