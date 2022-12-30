import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '~/assets/images/notfound.png';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate('/');
    };

    // handle click go to back on browser
    window.onpopstate = () => {
        navigate('/');
    };

    return (
        <div className={cx('container')}>
            <img src={NotFoundImg} alt="not-found" />
            <Button
                onClick={handleGoToHome}
                variant="contained"
                sx={{ width: 300, display: 'flex', alignItems: 'center' }}
            >
                <FaHome style={{ marginRight: 10 }} /> Go to home
            </Button>
        </div>
    );
}

export default NotFound;
