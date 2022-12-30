import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '~/components/Button';
import { remove } from '~/utils/BannerAPIRoutes';
import styles from './ImageBanner.module.scss';

const cx = classNames.bind(styles);

const ImageBanner = ({ banner, removeBanner }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteBanner = async (id) => {
        // const myPromise = new Promise((resolve) =>
        //     axios
        //         .post(`${remove}/${id}`)
        //         .then((response) => response.data)
        //         .then((data) => {
        //             setTimeout(() => {
        //                 resolve(removeBanner(id));
        //             }, 2000);
        //         }),
        // );

        const rm = async () => {
            const response = await axios.post(`${remove}/${id}`);
            removeBanner(id);
            return response.data;
        };

        toast.promise(
            rm,
            {
                pending: 'Đang xoá banner',
                success: 'Xoá banner thành công',
                error: 'Xoá banner thất bại',
            },
            {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'dark',
            },
        );

        handleClose();
    };

    return (
        <div className={cx('container')}>
            <img src={banner?.linkImage} alt="" />
            <div className={cx('action')}>
                <a href={banner?.link}>{banner?.link}</a>
                <Button
                    style={{ color: 'red', borderColor: 'red' }}
                    outline
                    small
                    leftIcon={<BiTrash />}
                    onClick={handleClickOpen}
                >
                    Xoá
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Are you delete this banner?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Once deleted you will not be able to restore this
                            banner anymore. Are you sure to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            primary
                            onClick={() => {
                                handleDeleteBanner(banner?._id);
                            }}
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ImageBanner;
