import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/app/currentUserSlice';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import CardProfile from './components/CardProfile';
import FormEditUser from './components/FormEditUser';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser.info);
    const { loading } = useSelector((state) => state.users);

    const initialValues = {
        firstName: currentUser && currentUser.firstName,
        lastName: currentUser && currentUser.lastName,
        email: currentUser && currentUser.email,
        password: '',
        phone: currentUser && currentUser.phone,
    };

    const handleOnSubmit = async (values) => {
        values._id = currentUser._id;
        dispatch(updateUser(values));
    };
    return (
        <>
            {currentUser && (
                <Container>
                    <HeaderChild title="Your Profile" />
                    <div className={cx('content__container')}>
                        <CardProfile currentUser={currentUser} />

                        <div className={cx('form__update-user')}>
                            <p className={cx('form-title')}>Account details</p>
                            <FormEditUser
                                initialValues={initialValues}
                                handleOnSubmit={handleOnSubmit}
                                loading={loading}
                            />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

export default Profile;
