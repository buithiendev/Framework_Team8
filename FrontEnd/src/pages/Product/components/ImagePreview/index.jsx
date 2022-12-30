// Import Swiper React components
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ImagePreview.module.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '~/assets/style.css';

// import required modules
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Pagination } from 'swiper';

const cx = classNames.bind(styles);

ImagePreview.propTypes = {
    linksImage: PropTypes.array,
};

ImagePreview.defaultProps = {
    linksImage: [],
};

function ImagePreview({ linksImage }) {
    const [imagePreview, setImagePreview] = useState(
        linksImage.length > 0 ? linksImage[0] : null,
    );
    const [active, setActive] = useState(0);

    const handleSelectImage = (index) => {
        setActive(index);
        setImagePreview(linksImage[index]);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('thumb-group')}>
                <img className={cx('image-prev')} alt="" src={imagePreview} />
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="swiper-product"
            >
                {linksImage &&
                    linksImage.map((link, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSelectImage(index)}
                            >
                                <img
                                    className={cx('img-item')}
                                    style={{
                                        border:
                                            active === index
                                                ? '2px solid #ccc'
                                                : 'none',
                                    }}
                                    alt=""
                                    src={link}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default ImagePreview;
