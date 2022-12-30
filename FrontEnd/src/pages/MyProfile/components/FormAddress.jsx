import { Divider } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { BiEdit, BiLocationPlus, BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import { addAddress } from '~/utils/customerRoute';
import styles from '../MyProfile.module.scss';

const cx = classNames.bind(styles);

const AddressItem = ({ deliInfo }) => {
    return (
        <div className={cx('address-item')}>
            <div className={cx('header')}>
                <p>
                    <BiLocationPlus /> Address{' '}
                </p>
                <div className={cx('action')}>
                    <Button
                        style={{ fontWeight: '300', fontSize: '1.4rem' }}
                        primary
                        leftIcon={<BiEdit />}
                        smallest
                    >
                        Edit
                    </Button>
                    <Button
                        style={{
                            fontWeight: '300',
                            fontSize: '1.4rem',
                            border: '1px solid red',
                            color: 'red',
                        }}
                        outline
                        leftIcon={<BiTrash />}
                        smallest
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <Divider />
            <div className={cx('info-detail')}>
                <div className={cx('row-info')}>
                    <label>Name:</label>
                    <p>{deliInfo.name}</p>
                </div>
                <div className={cx('row-info')}>
                    <label>Email:</label>
                    <p>{deliInfo.email}</p>
                </div>
                <div className={cx('row-info')}>
                    <label>Phone:</label>
                    <p>{deliInfo.phone}</p>
                </div>
                <div className={cx('row-info')}>
                    <label>Address:</label>
                    <p>{deliInfo.address}</p>
                </div>
            </div>
        </div>
    );
};

const FormAddAddress = ({ customer }) => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        address: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter a full name'),
        email: Yup.string().email().required('Please enter your email'),
        phone: Yup.string().required('Please enter your phone'),
        address: Yup.string().required('Please enter your address'),
    });

    const handleOnSubmit = (values, { resetForm }) => {
        const myPromise = new Promise((resolve, reject) => {
            axios
                .post(`${addAddress}/${customer?.email}`, values)
                .then((res) => {
                    setTimeout(() => {
                        localStorage.setItem(
                            'infoUser',
                            JSON.stringify(res.data),
                        );
                        resolve(res.data);
                    }, 3000);
                });
        });

        toast.promise(
            myPromise,
            {
                pending: 'Đang thêm địa chỉ moiứ',
                success: 'Thêm địa chỉ mới thành công',
                error: 'Thêm địa chỉ mới thất bại',
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
        <div className={cx('form-add-address')}>
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
                                name="name"
                                component={InputField}
                                label="Full Name"
                                placeholder="Bùi Thiện"
                            />
                            <div className={cx('date-of-birth-group')}>
                                <FastField
                                    name="email"
                                    component={InputField}
                                    label="Email"
                                    placeholder="Eg: deathdev@xyz.com"
                                />
                                <FastField
                                    name="phone"
                                    component={InputField}
                                    label="Phone"
                                    placeholder="+84357748844"
                                />
                            </div>
                            <FastField
                                name="address"
                                component={InputField}
                                label="Address"
                                placeholder="Eatoh, KrongNang, Daklak"
                            />
                            <Button primary type="submit">
                                Save
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

const FormAddress = () => {
    const { status, info } = useSelector((state) => state.currentUser);

    return (
        <div className={cx('form-address-container')}>
            <div className={cx('list-address')}>
                {info?.deliveryInformation?.map((d, index) => {
                    return <AddressItem key={index} deliInfo={d} />;
                })}
            </div>
            <FormAddAddress customer={info} />
        </div>
    );
};

export default FormAddress;
