import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import SwitchField from '~/components/CustomField/SwitchField';
import styles from './FormEditUser.module.scss';

const cx = classNames.bind(styles);

const rules = [
    { value: 1, label: 'Administrator' },
    { value: 2, label: 'Manager' },
    { value: 3, label: 'Staff' },
];

function FormEditUser({ initialValues, handleOnSubmit, currentUser, loading }) {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email should be valid and contain @')
            .required('Please enter your email'),
        // .test('CheckEmail', 'Email already in use', async (value) => {
        //     const { data } = await axios.post(checkEmail, { email: value });
        //     if (data.status) return true;
        //     return false;
        // }),
        password: Yup.string(),
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        role: Yup.number().required('Please choose a role').nullable(),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
        >
            {(formikProps) => {
                return (
                    <Form className={cx('form-wrap')}>
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                            }}
                        >
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
                            defaultChecked={currentUser && currentUser.status}
                            component={SwitchField}
                        />
                        <Button
                            type="submit"
                            loader={loading}
                            primary
                            style={{
                                margin: '10px auto',
                                width: '50%',
                            }}
                        >
                            Update
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default FormEditUser;
