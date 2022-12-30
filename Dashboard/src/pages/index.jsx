import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { routes } from '~/routes';
import { user } from '~/utils/UsersAPIRoutes';

import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import { getCategories } from './Categories/categoriesSlice';
import { getAllSeries } from './Categories/pages/EditCategory/components/AddOrEditSeries/seriesSlice';
import { getOrders } from './Orders/ordersSlice';
import { getAllStore } from './StoreList/storesSlice';
import { getUsers } from './Users/usersSlice';

function Pages() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.currentUser);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(user);
                if (!data) {
                    navigate('/login');
                } else {
                    dispatch(setInfoCurrentUser(data));
                }
            } catch (ex) {
                navigate('/login');
            }
        })();
    }, []);

    useEffect(() => {
        if (status) {
            dispatch(getUsers());
            dispatch(getCategories());
            dispatch(getAllSeries());
            dispatch(getOrders());
            dispatch(getAllStore());
        }
    }, [status]);

    return (
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
    );
}

export default memo(Pages);
