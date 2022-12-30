import { Routes, Route } from "react-router";
import MainCategories from './pages/MainCategories/index';
import EditCategory from './pages/EditCategory/index';

function Categories() {
    return (<Routes>
        <Route path="/" element={<MainCategories />} />
        <Route path="/edit/:id" element={<EditCategory />} />
    </Routes>);
}

export default Categories;