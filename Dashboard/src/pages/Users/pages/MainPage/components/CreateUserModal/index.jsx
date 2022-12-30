import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import SwitchField from '~/components/CustomField/SwitchField';
import { addUser } from '~/pages/Users/usersSlice';
import styles from './CreateUserModal.module.scss';

const cx = classNames.bind(styles);

const rules = [
    { value: 1, label: 'Administrator' },
    { value: 2, label: 'Manager' },
    { value: 3, label: 'Staff' },
];

function CreateUserModal({ complete }) {
    const { loading, success } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        role: null,
        password: '',
        phone: '',
        status: false,
    };

    // Fix here ...
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid and contain @').required('Please enter your email'),
        // .test('CheckEmail', 'Email already in use', async (value) => {
        //     const { data } = await axios.post(checkEmail, { email: value });
        //     if (data.status) return true;
        //     return false;
        // }),
        password: Yup.string().required('Please enter a password'),
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        role: Yup.number().required('Please choose a role').nullable(),
    });

    const handleOnSubmit = async (values) => {
        dispatch(addUser(values));
        success && complete()
    };
    return (
        <div className={cx('create-user__modal')}>
            <div className={cx('heading')}>
                <BiUserPlus />
                <h4>Add employees to the system</h4>
                <p>Please enter username, email and settings for new users</p>
            </div>
            <div className={cx('form')}>
                <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
                    {(formikProps) => {
                        return (
                            <Form className={cx('form-wrap')}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <FastField
                                        name="firstName"
                                        label="First Name"
                                        required
                                        component={InputField}
                                        placeholder="Eg: Death"
                                    />
                                    <FastField
                                        name="lastName"
                                        label="Last Name"
                                        required
                                        component={InputField}
                                        placeholder="Eg: Lock"
                                    />
                                </div>
                                <FastField
                                    name="email"
                                    component={InputField}
                                    required
                                    label="Email"
                                    placeholder="Eg: deathteam@dev.com"
                                />

                                <FastField
                                    name="phone"
                                    label="Phone"
                                    component={InputField}
                                    placeholder="Enter your phone number..."
                                />
                                <FastField
                                    name="role"
                                    label="Decentralization"
                                    component={SelectField}
                                    placeholder="Choose a role ..."
                                    options={rules}
                                />
                                <FastField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    required
                                    component={InputField}
                                    placeholder="*********"
                                />
                                <FastField
                                    name="status"
                                    label="Active status"
                                    defaultChecked={false}
                                    component={SwitchField}
                                />
                                <Button
                                    type="submit"
                                    loader={loading}
                                    primary
                                    style={{ margin: '10px auto', width: '50%' }}
                                >
                                    Create
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default CreateUserModal;
