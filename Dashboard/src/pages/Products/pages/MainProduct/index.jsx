import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import productEmpty from '~/assets/images/img_cart_empty.png';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import { deleteProduct, getBySeriesId } from '~/utils/ProductAPIRoutes';
import ProductTable from './components/ProductTable';
import styles from './MainProduct.module.scss';
import ProductCard from './ProductCard';

const cx = classNames.bind(styles);

const optionCategory = [];
const optionSeries = [];

function MainProduct() {
    const categories = useSelector((state) => state.categories.categories);
    const [categorySelect, setCategorySelect] = useState();
    const [seriesSelect, setSeriesSelect] = useState();
    const series = useSelector((state) => state.series.series);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        categories.map((category) => {
            optionCategory.push({ value: category._id, label: category.name });
        });
        if (optionCategory.length > 0) setCategorySelect(optionCategory[0]);
    }, [categories]);

    useEffect(() => {
        if (categorySelect) {
            optionSeries.splice(0, optionSeries.length);
            series.map((seri) => {
                if (seri.categoryId === categorySelect.value) {
                    optionSeries.push({
                        value: seri._id,
                        label: seri.name,
                    });
                }
            });
            if (optionSeries.length > 0) setSeriesSelect(optionSeries[0]);
        }
    }, [categorySelect]);

    useEffect(() => {
        if (categorySelect && seriesSelect) {
            (async () => {
                const products = await axios.get(
                    `${getBySeriesId}/${seriesSelect.value}`,
                );

                if (products.data) {
                    setProducts(products.data);
                } 
            })();
        }
    }, [seriesSelect]);


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
            <HeaderChild title="Products">
                <Button small outline to="/products/add">
                    → Add Product
                </Button>
            </HeaderChild>
            <div className={cx('filters')}>
                <Select
                    value={categorySelect}
                    className={cx('select')}
                    isSearchable={false}
                    onChange={setCategorySelect}
                    options={optionCategory}
                />
                <Select
                    value={seriesSelect}
                    className={cx('select')}
                    isSearchable={false}
                    onChange={setSeriesSelect}
                    options={optionSeries}
                />
            </div>
            <ProductTable products={products}/>
        </Container>
    );
}

export default MainProduct;
