import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import '~/assets/style.css';
import { getAll } from '~/utils/bannerRoute';
import styles from './TabSlide.module.scss';

const cx = classNames.bind(styles);

function PromotionalSlides() {
    const [imagesBanner, setImagesBanner] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(getAll);
            if (response?.data) {
                setImagesBanner(response?.data);
            }
        })();
    }, []);

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {imagesBanner?.map((banner, index) => {
                return (
                    <SwiperSlide key={index}>
                        <a href={banner.link}>
                            <img
                                className={cx('img-slide')}
                                src={banner.linkImage}
                                alt=""
                            />
                        </a>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default PromotionalSlides;
