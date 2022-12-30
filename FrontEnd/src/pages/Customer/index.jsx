import { Route, Routes } from 'react-router-dom';
import CartPage from '../Cart';
import MyProfile from './../MyProfile/index';

const Customer = () => {
    return (
        <Routes>
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
};

export default Customer;
