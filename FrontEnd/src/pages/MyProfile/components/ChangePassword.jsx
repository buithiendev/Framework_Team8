import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import styles from '../MyProfile.module.scss';
import { changePassword } from './../../../utils/customerRoute';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const { status, info } = useSelector((state) => state.currentUser);
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Please enter a old password'),
        newPassword: Yup.string().required('Please enter a new password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please enter a new password'),
    });

    const handleOnSubmit = (values, { resetForm }) => {
        const myPromise = async () => {
            const { data } = await axios.post(
                `${changePassword}/${info?.email}`,
                values,
            );

            if (data.status) {
                resetForm();
                return data.status;
            }
            return new Error();
        };

        toast.promise(
            myPromise,
            {
                pending: 'Đang xử lý',
                success: 'Thay đổi mật khẩu thành công',
                error: 'Thay đổi mật khẩu thất bại',
            },
            {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: true,
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

    return (
        <div className={cx('change-password')}>
            <p className={cx('note')}>
                Note: Password must be at least 8 characters including letters,
                numbers and special characters
            </p>
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
                                name="oldPassword"
                                type="password"
                                label="Old Password"
                                component={InputField}
                            />
                            <FastField
                                name="newPassword"
                                type="password"
                                label="New password"
                                component={InputField}
                            />
                            <FastField
                                name="confirmPassword"
                                type="password"
                                label="Confirm password"
                                component={InputField}
                            />
                            <Button primary type="submit">
                                Change Password
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ChangePassword;
