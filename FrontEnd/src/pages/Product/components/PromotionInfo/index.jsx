import classNames from 'classnames/bind';
import { BiGift } from 'react-icons/bi';
import styles from './Promotion.module.scss';

const cx = classNames.bind(styles);

function PromotionInfo({ promotionInfo }) {
    return (
        <div className={cx('promotion-info')}>
            <h6>
                <BiGift size={20} /> Thông tin khuyến mãi
            </h6>
            <p
                dangerouslySetInnerHTML={{
                    __html: promotionInfo,
                }}
            ></p>
        </div>
    );
}

export default PromotionInfo;
