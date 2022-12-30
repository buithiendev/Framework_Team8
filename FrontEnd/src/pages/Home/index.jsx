import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import '~/assets/style.css';
import { getCategories } from '~/utils/categoriesRoute';
import { customer } from '~/utils/customerRoute';
import SomeProduct from '../../components/SomeProduct';
import PromotionalSlides from './components/PromotionalSlides';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.currentUser);

    const [categories, setCategories] = useState();

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

    useEffect(() => {
        (async () => {
            try {
                if (!status) {
                    const { data } = await axios.get(customer);
                    if (data) {
                        dispatch(setInfoCurrentUser(data));
                    }
                }
            } catch (ex) {}
        })();
    }, []);

    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            const res = await axios.get(getCategories);
            if (res.data && !unsubcribed) setCategories(res.data);
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <div className={cx('container')}>
            <PromotionalSlides />
            <div className={cx('wrapper')}>
                {categories &&
                    categories.map((category, index) => {
                        return <SomeProduct category={category} key={index} />;
                    })}
            </div>
        </div>
    );
}

export default Home;
