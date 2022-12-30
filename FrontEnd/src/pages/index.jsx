import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCart } from '~/app/cartSlice';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import { getAllStore } from '~/app/storesSlice';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import { routes } from '~/routes';
import { customer } from '~/utils/customerRoute';

const Page = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllStore());
        (async () => {
            try {
                const { data } = await axios.get(customer);
                if (!data) {
                } else {
                    dispatch(setInfoCurrentUser(data));
                }
            } catch (ex) {}
        })();
    }, []);

    const carts = JSON.parse(localStorage.getItem('carts'));
    dispatch(setCart(carts));

    return (
        <div className="App">
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={`${route.path}/*`}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

export default Page;
