import { Route, Routes } from 'react-router-dom';
import EditUser from './pages/EditUser';
import MainPage from './pages/MainPage';

function Users() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
    );
}

export default Users;
