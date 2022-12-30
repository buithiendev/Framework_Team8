import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import { getUserByIdRoute } from '~/utils/UsersAPIRoutes';
import { updateUser } from '../../usersSlice';
import CardProfile from './components/CardProfile';
import FormEditUser from './components/FormEditUser';
import styles from './EditUser.module.scss';

const cx = classNames.bind(styles);

function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentUser, setCurrentUser] = useState();
    const { loading } = useSelector((state) => state.users);

    useEffect(() => {
        (async () => {
            const user = await axios.get(`${getUserByIdRoute}/${params.id}`);
            setCurrentUser(user.data);
        })();
    }, []);

    const initialValues = {
        firstName: currentUser && currentUser.firstName,
        lastName: currentUser && currentUser.lastName,
        email: currentUser && currentUser.email,
        role: currentUser && currentUser.role,
        password: '',
        phone: currentUser && currentUser.phone,
        status: currentUser && currentUser.status,
    };

    const handleOnSubmit = (values) => {
        dispatch(updateUser({ id: params.id, data: values }));
    };
    return (
        <>
            {currentUser && (
                <Container>
                    <HeaderChild title="User Profile" />
                    <div className={cx('content__container')}>
                        <CardProfile currentUser={currentUser} />

                        <div className={cx('form__update-user')}>
                            <p className={cx('form-title')}>Account details</p>
                            <FormEditUser
                                initialValues={initialValues}
                                handleOnSubmit={handleOnSubmit}
                                currentUser={currentUser}
                                loading={loading}
                            />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

export default EditUser;
