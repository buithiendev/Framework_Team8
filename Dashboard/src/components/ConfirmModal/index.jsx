import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

function ConfirmModal({ question, cancleForm }) {
    return (
        <div className={cx('confirm-modal__container')}>
            <h4>{question}</h4>
            <section>
                <Button outline onClick={cancleForm}>Cancle</Button>
                <Button primary>Confirm</Button>
            </section>
        </div>
    );
}

export default ConfirmModal;
