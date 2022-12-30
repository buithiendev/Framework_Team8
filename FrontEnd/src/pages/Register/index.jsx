import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import registerImg from '~/assets/images/Mobile-login.jpg';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import { dateOption, genderOption, monthOption, yearOption } from '~/constants';
import { create } from '~/utils/customerRoute';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

Register.propTypes = {
    onSubmit: PropTypes.func,
};

Register.defaultProps = {
    onSubmit: null,
};

function Register(props) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const { status, info } = useSelector((state) => state.currentUser);

    if(status) navigate('/')

    const initialValues = {
        fullName: '',
        gender: 'Male',
        date: 1,
        month: 1,
        year: 2001,
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Please enter a full name'),
        email: Yup.string().email().required('Please enter your email'),
        password: Yup.string().required('Please enter a password'),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
        ).required('Please enter a new password'),
    });

    const handleOnSubmit = async (values) => {
        const { data } = await axios.post(create, values);

        if (data.status) navigate('/login');
        else if (data?.msg) {
            setMessage(
                'This email address is already in use, please choose another email',
            );
        }
    };

    return (
        <div className={cx('register__container')}>
            <div className={cx('register__form')}>
                <div className={cx('form__wrap')}>
                    <div>
                        <img
                            className={cx('register__form-img')}
                            src={registerImg}
                            alt=""
                        />
                    </div>
                    <div className={cx('form__right')}>
                        <h1>Register</h1>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                        >
                            {(formikProps) => {
                                return (
                                    <Form
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}
                                    >
                                        <FastField
                                            name="fullName"
                                            component={InputField}
                                            label="Full Name"
                                            placeholder="Bùi Thiện"
                                        />
                                        <FastField
                                            name="gender"
                                            label="Gender"
                                            component={SelectField}
                                            placeholder="Choose a series ..."
                                            options={genderOption}
                                        />
                                        <div
                                            className={cx(
                                                'date-of-birth-group',
                                            )}
                                        >
                                            <FastField
                                                name="date"
                                                label="Date"
                                                component={SelectField}
                                                placeholder="Choose a series ..."
                                                options={dateOption}
                                            />
                                            <FastField
                                                name="month"
                                                label="Month"
                                                component={SelectField}
                                                placeholder="Choose a series ..."
                                                options={monthOption}
                                            />
                                            <FastField
                                                name="year"
                                                label="Year"
                                                component={SelectField}
                                                placeholder="Choose a series ..."
                                                options={yearOption}
                                            />
                                        </div>
                                        <FastField
                                            name="email"
                                            component={InputField}
                                            label="Email"
                                            placeholder="Eg: deathdev@xyz.com"
                                        />
                                        <FastField
                                            name="password"
                                            type="password"
                                            label="Password"
                                            component={InputField}
                                        />
                                        <FastField
                                            name="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                            component={InputField}
                                        />
                                        <Button primary type="submit">
                                            Register
                                        </Button>
                                        {message && (
                                            <span className={cx('message')}>
                                                {message}
                                            </span>
                                        )}
                                    </Form>
                                );
                            }}
                        </Formik>
                        <span className={cx('already')}>
                            Do you already have an account?
                            <Link to="/login">Login Now</Link>
                        </span>
                        <p className={cx('form__contact')}>
                            Contact Admin:
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

export default Register;
