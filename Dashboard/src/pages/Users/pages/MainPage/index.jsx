import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import CreateUserModal from './components/CreateUserModal';
import TableUsers from './components/TableUser';
import styles from './MainPage.module.scss';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function MainPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { users } = useSelector((state) => state.users);

    const completeSubmit = () => {
        handleClose();
    };

    return (
        <Container>
            <HeaderChild title="List of employee">
                <Button
                    small
                    primary
                    onClick={handleOpen}
                    style={{ fontWeight: 400 }}
                >
                    Add new users
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box style={style}>
                            <CreateUserModal complete={completeSubmit} />
                        </Box>
                    </Fade>
                </Modal>
            </HeaderChild>

            <div className={cx('content')}>
                <div className={cx('table')}>
                    <TableUsers users={users} />
                </div>
            </div>
        </Container>
    );
}

export default MainPage;
