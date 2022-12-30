import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import AddStore from './AddStore';
import MainStore from './MainStore';

function StoreList() {
    return (
        <Routes>
            <Route path="/" element={<MainStore />} />
            <Route path="/add" element={<AddStore />} />
        </Routes>
    );
}

export default StoreList;
