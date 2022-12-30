import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '~/pages/Categories/categoriesSlice';
import seriesReducer from '~/pages/Categories/pages/EditCategory/components/AddOrEditSeries/seriesSlice';
import ordersReducer from '~/pages/Orders/ordersSlice';
import productsReducer from '~/pages/Products/productsSlice';
import storesReducer from '~/pages/StoreList/storesSlice';
import usersReducer from '~/pages/Users/usersSlice';
import currentUserReducer from './currentUserSlice';

const rootReducer = {
    users: usersReducer,
    currentUser: currentUserReducer,
    categories: categoriesReducer,
    series: seriesReducer,
    products: productsReducer,
    orders: ordersReducer,
    stores: storesReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
