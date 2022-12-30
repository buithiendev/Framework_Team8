import classNames from 'classnames/bind';
// import img from '~/assets/images/macimg.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearCart, removeItem } from '~/app/cartSlice';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import { customer } from '~/utils/customerRoute';
import { getProductWithColor } from '~/utils/productsRoute';
import { addOrder } from './../../utils/orderRoute';
import styles from './Cart.module.scss';
import FormPayment from './components/FormPayment';
import SubTotal from './components/SubTotal/index';
import TableCart from './components/TableCart/index';

const cx = classNames.bind(styles);

function CartPage() {
    const { cart } = useSelector((state) => state.cart);
    const { status, info } = useSelector((state) => state.currentUser);
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const listPromise = [];
            cart?.map((item) => {
                const response = axios
                    .post(`${getProductWithColor}/${item.product}`, {
                        color: item.colorSelected,
                    })
                    .then((res) => res.data);
                listPromise.push(response);
            });

            const listItem = await Promise.all(listPromise);
            setListProduct(listItem);
        })();
    }, [cart]);

    if (!status) {
        (async () => {
            try {
                const { data } = await axios.get(customer);
                if (!data) {
                } else {
                    dispatch(setInfoCurrentUser(data));
                }
            } catch (ex) {}
        })();
    }

    const initialValues = {
        fullInfo: 'NewInfo',
        name: '',
        phone: '',
        email: '',
        deliveryForm: 'homedelivery',
        storeAddress: null,
        province: '',
        district: '',
        specificAddress: '',
        paymentMethod: 'transfer',
    };

    const handleOnSubmit = async (values) => {

        setLoading(true);
        const data = {
            ...values,
            listProduct,
            orderAccount: info ? info._id : null,
        };

        try {
            const response = await axios.post(addOrder, data);
            setTimeout(() => {
                setLoading(false);
                if (response?.data) {
                    navigate(`/shoppingcart/completed/${response.data._id}`);
                    dispatch(clearCart());
                }
            }, 3000);
        } catch (e) {
            console.log(e);
        }
    };

    const handleRemoveCartItem = (index) => {
        dispatch(removeItem(index));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div>
                    <TableCart
                        listProduct={listProduct}
                        handleRemoveCartItem={handleRemoveCartItem}
                    />
                    <div className={cx('info-payment')}>
                        <h2>Payment Information</h2>
                        <FormPayment
                            info={info}
                            initialValues={initialValues}
                            handleOnSubmit={handleOnSubmit}
                            loading={loading}
                        />
                    </div>
                </div>
                <div>
                    <SubTotal listProduct={listProduct} />
                </div>
            </div>
        </div>
    );
}

export default CartPage;
