import classNames from 'classnames/bind';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './SlideCategory.module.scss'
import '~/assets/style.css'

const cx = classNames.bind(styles);

function SlideCategory({linksImage, className}) {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={className}
        >
            {linksImage.map((link, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img className={cx('img-slide')} src={link} alt="" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default SlideCategory;
