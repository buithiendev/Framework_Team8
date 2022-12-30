import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import MainProduct from './pages/MainProduct';
import EditProduct from './pages/EditProduct';

function Products() {
    return (
        <Routes>
            <Route path="/" element={<MainProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
    );
}

export default Products;
