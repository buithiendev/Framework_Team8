import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import currentUserReducer from './currentUserSlice';
import storeReducer from './storesSlice'

const rootReducer = {
    currentUser: currentUserReducer,
    cart: cartReducer,
    stores: storeReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
