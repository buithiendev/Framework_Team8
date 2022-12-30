import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Page from './pages/index';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/*" element={<Page />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
