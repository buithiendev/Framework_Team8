import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { add, getAll } from './../../utils/BannerAPIRoutes';
import styles from './Banner.module.scss';
import FormBanner from './Components/FormBanner/index';
import ImageBanner from './Components/ImageBanner';

const cx = classNames.bind(styles);

const Banner = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        (async () => {
            const getBanner = await axios.get(getAll);

            if (getBanner?.data) {
                setBanners(getBanner.data);
            }
        })();
    }, []);

    const initialValues = {
        linkBanner: '',
        image: [],
    };

    const validationSchema = Yup.object().shape({
        image: Yup.array().min(1, 'Please upload the appropriate banner image'),
    });

    const handleOnSubmit = (value, { resetForm }) => {
        const { linkBanner, image } = value;

        const formData = new FormData();
        formData.append('link', linkBanner);
        formData.append('Image', image[0]);

        const addData = async () => {
            const response = await axios.post(add, formData);
            if(response?.data) {
                resetForm()
                addBanner(response.data);
            }
            return response.data;
        };

        toast.promise(
            addData,
            {
                pending: 'Đang thêm banner. Vui lòng chờ',
                success: 'Thêm banner thành công',
                error: 'Thêm banner thất bại',
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
    };

    const addBanner = (banner) => {
        const newBanners = [...banners, banner];
        setBanners(newBanners);
    };

    const removeBanner = (id) => {
        setBanners((prev) => prev.filter((v) => v._id !== id));
    };
    return (
        <Container>
            <HeaderChild title="Banner Advertisement"></HeaderChild>
            <div className={cx('content')}>
                <Paper>
                    <FormBanner
                        initialValues={initialValues}
                        handleOnSubmit={handleOnSubmit}
                        validationSchema={validationSchema}
                    />
                </Paper>
            </div>
            {
                <div className={cx('list-banner')}>
                    {banners.map((banner, index) => {
                        return (
                            <ImageBanner
                                key={uuidv4()}
                                banner={banner}
                                removeBanner={removeBanner}
                            />
                        );
                    })}
                </div>
            }
            <ToastContainer />
        </Container>
    );
};

export default Banner;
