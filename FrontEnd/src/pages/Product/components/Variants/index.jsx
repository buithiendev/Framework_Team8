import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Variants.module.scss';

const cx = classNames.bind(styles);

Variants.propTypes = {
    rams: PropTypes.string,
    memorys: PropTypes.string,
    colors: PropTypes.array,
};

Variants.defaultProps = {
    rams: String,
    memorys: String,
    colors: [],
};

function Variants({
    id,
    rams,
    memorys,
    colors,
    basicPrice,
    similarProducts = [],
    chooseColor
}) {
    const [colorSelect, setColorSelect] = useState(
        colors.length > 0 && colors[0],
    );

    useEffect(() => {
        setColorSelect(colors.length > 0 && colors[0]);
    }, [id]);

    const handleSelectColor = (index) => {
        setColorSelect(colors[index]);
    };

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    return (
        <div className={cx('variants')}>
            <h4 className={cx('product-price')}>
                {convertToVND(colorSelect.priceColor * 1)}
            </h4>
            {rams && (
                <div className={cx('variants-item')}>
                    <span>Chọn RAM: </span>
                    <div className={cx('list-item')}>
                        {rams && (
                            <Button
                                to={`/product/${id}`}
                                style={{
                                    width: '100px',
                                    border: '2px solid #0066CC',
                                }}
                                outline
                            >
                                {rams}
                            </Button>
                        )}
                        {similarProducts &&
                            similarProducts.map((product) => {
                                if (product.rams !== rams) {
                                    return (
                                        <Button
                                            to={`/product/${product.id}`}
                                            style={{
                                                width: '100px',
                                                border: '1px solid #ccc',
                                            }}
                                            key={product._id}
                                        >
                                            {product.rams}
                                        </Button>
                                    );
                                }
                                return null;
                            })}
                    </div>
                </div>
            )}
            {memorys && (
                <div className={cx('variants-item')}>
                    <span>Chọn dung lượng: </span>
                    <div className={cx('list-item')}>
                        {memorys && (
                            <Button
                                to={`/product/${id}`}
                                style={{
                                    width: '100px',
                                    border: '2px solid #0066CC',
                                }}
                                size="small"
                                variant="contained"
                            >
                                {memorys}
                            </Button>
                        )}
                        {similarProducts &&
                            similarProducts.map((product) => {
                                return (
                                    <Button
                                        key={product._id}
                                        style={{
                                            width: '100px',
                                            border: '1px solid #ccc',
                                        }}
                                        to={`/product/${product.id}`}
                                        size="small"
                                    >
                                        {product.memorys}
                                    </Button>
                                );
                            })}
                    </div>
                </div>
            )}
            {colors && (
                <div className={cx('variants-item')}>
                    <span>Chọn màu: </span>
                    <div className={cx('list-item')}>
                        {colors.map((color, index) => {
                            return (
                                <Button
                                    key={index}
                                    size="small"
                                    style={{
                                        border:
                                            color === colorSelect
                                                ? '2px solid #0066CC'
                                                : '1px solid #ccc',
                                    }}
                                    onClick={() => {
                                        handleSelectColor(index);
                                        chooseColor(color)
                                    }}
                                >
                                    {color.nameColor}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Variants;
