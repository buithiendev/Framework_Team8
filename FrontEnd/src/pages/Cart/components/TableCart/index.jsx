import classNames from 'classnames/bind';
import { BiTrash } from 'react-icons/bi';
// import ip14 from '~/assets/images/iphone14.png';
import IconButton from '@mui/material/IconButton';
import { memo } from 'react';
import emptyCart from '~/assets/images/empty-cart.png';
import Button from '~/components/Button';
import styles from './TableCart.module.scss';

const cx = classNames.bind(styles);

function TableCart({ listProduct, handleRemoveCartItem }) {
    const convertVND = (money) => {
        return money.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    return (
        <>
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct?.map((product, index) => {
                        const {
                            linksImage,
                            rams,
                            memorys,
                            name,
                            colorSelect,
                            _id,
                        } = product;
                        return (
                            <tr className={cx('table-row')} key={index}>
                                <td>
                                    <img
                                        className={cx('img-product')}
                                        alt=""
                                        src={linksImage[0]}
                                    />
                                </td>
                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <h3>{name}</h3>

                                        {colorSelect?.nameColor && (
                                            <span>
                                                Color: {colorSelect?.nameColor}
                                            </span>
                                        )}
                                        {colorSelect?.nameColor && (
                                            <span>Memory: {memorys}</span>
                                        )}
                                        {colorSelect?.nameColor && (
                                            <span>RAM: {rams}</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {convertVND(colorSelect?.priceColor * 1)}
                                </td>
                                <td>1</td>
                                <td>
                                    <IconButton
                                        onClick={() => {
                                            handleRemoveCartItem(index);
                                        }}
                                    >
                                        <BiTrash />
                                    </IconButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {listProduct?.length === 0 && (
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: '500',
                        padding: 24,
                        display: 'flex',
                        color: '#778D92',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                    }}
                >
                    <img style={{ width: '400px' }} src={emptyCart} alt="" />
                    There are no products in the cart
                    <Button
                        to="/"
                        outline
                        style={{ marginTop: '24px', maxHeight: '36px' }}
                    >
                        Back to the store
                    </Button>
                </div>
            )}
        </>
    );
}

export default memo(TableCart);
