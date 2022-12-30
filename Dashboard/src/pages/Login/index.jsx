import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import imgLogin from '~/assets/images/img-01.webp';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import { loginRoute } from '~/utils/UsersAPIRoutes';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

Login.propTypes = {
    onSubmit: PropTypes.func,
};

Login.defaultProps = {
    onSubmit: null,
};

function Login(props) {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        onSubmit: null,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Please enter your email'),
        password: Yup.string().required('Please enter a password'),
    });

    const handleOnSubmit = async (values) => {
        const { email, password } = values;
        try {
            const { data } = await axios.post(
                loginRoute,
                {
                    email,
                    password,
                },
                { withCredentials: true },
            );
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${data['token']}`;
            data.token && navigate('/');
        } catch (ex) {}
    };

    return (
        <div className={cx('login__container')}>
            <div className={cx('login__form')}>
                <div className={cx('form__wrap')}>
                    <div>
                        <img
                            className={cx('login__form-img')}
                            src={imgLogin}
                            alt=""
                        />
                    </div>
                    <div className={cx('form__right')}>
                        <h1>Member Login</h1>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                        >
                            {(formikProps) => {
                                return (
                                    <Form
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}
                                    >
                                        <FastField
                                            name="email"
                                            component={InputField}
                                            placeholder="Eg: deathdev@xyz.com"
                                            icon={<FaEnvelope />}
                                        />
                                        <FastField
                                            name="password"
                                            type="password"
                                            component={InputField}
                                            placeholder="Password"
                                            icon={<FaLock />}
                                        />
                                        <Button primary type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                        <span className={cx('form__forgot')}>
                            Forgot <Link to="/forgot">Username/Password</Link>
                        </span>
                        <p className={cx('form__contact')}>
                            Contact Admin:{' '}
                            <a href="mailto:buithiendev@gmail.com">
                                deathops.dev@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;