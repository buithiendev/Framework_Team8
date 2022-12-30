import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import classNames from 'classnames/bind';
import { FastField, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import cashOnDelivery from '~/assets/images/cashondelivery.png';
import transfer from '~/assets/images/transfer.png';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import styles from './FormPayment.module.scss';

const cx = classNames.bind(styles);

const FormPayment = ({ initialValues, handleOnSubmit, loading, info }) => {
    const { stores } = useSelector((state) => state.stores);
    const listInfoPayment =
        JSON.parse(localStorage.getItem('list_info_payment')) || [];
    listInfoPayment.push({ value: 'NewInfo', label: 'Add new information' });
    const [showForm, setShowForm] = useState('NewInfo');
    const [showFormInfo, setShowFormInfo] = useState('homedelivery');

    const optionStore = [];

    stores.map((store) => {
        optionStore.push({ value: store._id, label: store.address });
    });

    if (info) {
        info?.deliveryInformation.map((d) => {
            listInfoPayment.push({
                value: d._id,
                label: `${d.name}, ${d.address}`,
            });
        });
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().when(['fullInfo'], {
            is: (fullInfo) => fullInfo === 'NewInfo',
            then: Yup.string().required("Please enter consignee's name"),
        }),
        phone: Yup.string().when([], {
            is: (fullInfo) => fullInfo === 'NewInfo',
            then: Yup.string().required('Please enter the phone number'),
        }),
        email: Yup.string().when([], {
            is: (fullInfo) => fullInfo === 'NewInfo',
            then: Yup.string().email(),
        }),
        deliveryForm: Yup.string().when([], {
            is: (fullInfo) => fullInfo === 'NewInfo',
            then: Yup.string().required('Please choose a delivery method'),
        }),
        storeAddress: Yup.string().when(['deliveryForm'], {
            is: (deliveryForm) =>
                showForm === 'NewInfo' && deliveryForm === 'atstore',
            then: Yup.string().required(
                'Please select the store to receive the order',
            ),
        }),
        specificAddress: Yup.string().when(['deliveryForm'], {
            is: (deliveryForm, fullInfo) =>
                fullInfo === 'NewInfo' && deliveryForm === 'homedelivery',
            then: Yup.string().required('Please enter detailed address'),
        }),
        province: Yup.string().when(['deliveryForm'], {
            is: (deliveryForm, fullInfo) =>
                fullInfo === 'NewInfo' && deliveryForm === 'homedelivery',
            then: Yup.string().required('Please enter province/city'),
        }),
        district: Yup.string().when(['deliveryForm'], {
            is: (deliveryForm, fullInfo) =>
                fullInfo === 'NewInfo' && deliveryForm === 'homedelivery',
            then: Yup.string().required('Please enter county/district'),
        }),
    });

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            padding: '5px',
            border: '1px solid #ccc',
            fontSize: '1.4rem',
            fontWeight: '500',
            borderRadius: '8px',
        }),
    };

    return (
        <div className={cx('container')}>
            <div className={cx('form-input')}>
                <label className={cx('label-form')}>Personal information</label>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                >
                    {(formikProps) => {
                        return (
                            <>
                                <Form
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px',
                                    }}
                                >
                                    <FastField
                                        name="fullInfo"
                                        component={SelectField}
                                        options={listInfoPayment}
                                    />
                                    {formikProps.values.fullInfo ===
                                        'NewInfo' && (
                                        <>
                                            <FastField
                                                name="name"
                                                label="Full Name"
                                                required
                                                component={InputField}
                                            />
                                            <div className={cx('column-input')}>
                                                <FastField
                                                    name="phone"
                                                    label="Phone"
                                                    required
                                                    component={InputField}
                                                />
                                                <FastField
                                                    name="email"
                                                    label="Email"
                                                    component={InputField}
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    'column-input',
                                                    'flex-direction',
                                                )}
                                                role="group"
                                                aria-labelledby="my-radio-group"
                                            >
                                                <label
                                                    className={cx('label-form')}
                                                >
                                                    Delivery form
                                                </label>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItem: 'center',
                                                        gap: '3rem',
                                                    }}
                                                >
                                                    <label
                                                        style={{
                                                            display: 'flex',
                                                            alignItem: 'center',
                                                            gap: '1rem',
                                                            fontSize: '1.4rem',
                                                        }}
                                                    >
                                                        <Field
                                                            type="radio"
                                                            name="deliveryForm"
                                                            value="atstore"
                                                            onChange={(e) => {
                                                                setShowFormInfo(
                                                                    e.target
                                                                        .value,
                                                                );
                                                                formikProps.values.deliveryForm =
                                                                    e.target.value;
                                                            }}
                                                        />
                                                        At Store
                                                    </label>
                                                    <label
                                                        style={{
                                                            display: 'flex',
                                                            alignItem: 'center',
                                                            gap: '1rem',
                                                            fontSize: '1.4rem',
                                                        }}
                                                    >
                                                        <Field
                                                            type="radio"
                                                            name="deliveryForm"
                                                            value="homedelivery"
                                                            onChange={(e) => {
                                                                setShowFormInfo(
                                                                    e.target
                                                                        .value,
                                                                );
                                                                formikProps.values.deliveryForm =
                                                                    e.target.value;
                                                            }}
                                                        />
                                                        Delivery Home
                                                    </label>
                                                </div>
                                            </div>
                                            {formikProps.values.deliveryForm ===
                                            'atstore' ? (
                                                <FastField
                                                    name="storeAddress"
                                                    label="Choose store"
                                                    component={SelectField}
                                                    options={optionStore}
                                                />
                                            ) : (
                                                <div>
                                                    <div
                                                        className={cx(
                                                            'column-input',
                                                        )}
                                                    >
                                                        <FastField
                                                            name="province"
                                                            label="Province/City"
                                                            component={
                                                                InputField
                                                            }
                                                        />
                                                        <FastField
                                                            name="district"
                                                            label="County/District"
                                                            component={
                                                                InputField
                                                            }
                                                        />
                                                    </div>
                                                    <FastField
                                                        name="specificAddress"
                                                        label="Specific address"
                                                        component={InputField}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <div className={cx('payment-method')}>
                                        <label className={cx('label-form')}>
                                            Payment method
                                        </label>
                                        <div className={cx('method')}>
                                            <FormControl
                                                sx={{
                                                    fontSize: '12px',
                                                    width: '100%',
                                                }}
                                            >
                                                <RadioGroup
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns:
                                                            '1fr 1fr',
                                                        gap: '2rem',
                                                    }}
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="paymentMethod"
                                                    defaultValue="transfer"
                                                    onChange={(e) => {
                                                        console.log(
                                                            e.target.value,
                                                        );
                                                        formikProps.initialValues.paymentMethod =
                                                            e.target.value;
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="momo"
                                                        control={<Radio />}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            padding:
                                                                '10px 20px',
                                                            backgroundColor:
                                                                'rgb(233, 233, 233)',
                                                            borderRadius: '8px',
                                                        }}
                                                        label={
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItem:
                                                                        'center',
                                                                    gap: '1rem',
                                                                }}
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: '40px',
                                                                    }}
                                                                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                                                    alt=""
                                                                />
                                                                <label
                                                                    style={{
                                                                        margin: 'auto 0',
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Payment Momo
                                                                </label>
                                                            </div>
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="onepay"
                                                        control={<Radio />}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            padding:
                                                                '10px 20px',
                                                            backgroundColor:
                                                                'rgb(233, 233, 233)',
                                                            borderRadius: '8px',
                                                        }}
                                                        label={
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItem:
                                                                        'center',
                                                                    gap: '1rem',
                                                                }}
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: '40px',
                                                                    }}
                                                                    src="https://play-lh.googleusercontent.com/mvedVCbQg6ADKUYYraVLOlmOfOy2Rz66kEPvbmxt5xZ2TTa90Go9jBD2dJrwWmEo5g8"
                                                                    alt=""
                                                                />
                                                                <label
                                                                    style={{
                                                                        margin: 'auto 0',
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Payment
                                                                    OnePay
                                                                </label>
                                                            </div>
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="transfer"
                                                        control={<Radio />}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            padding:
                                                                '10px 20px',
                                                            backgroundColor:
                                                                'rgb(233, 233, 233)',
                                                            borderRadius: '8px',
                                                        }}
                                                        label={
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItem:
                                                                        'center',
                                                                    gap: '1rem',
                                                                }}
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: '40px',
                                                                    }}
                                                                    src={
                                                                        transfer
                                                                    }
                                                                    alt=""
                                                                />
                                                                <label
                                                                    style={{
                                                                        margin: 'auto 0',
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Bank
                                                                    Transfer
                                                                </label>
                                                            </div>
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="cashondelivery"
                                                        control={<Radio />}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            padding:
                                                                '10px 20px',
                                                            backgroundColor:
                                                                'rgb(233, 233, 233)',
                                                            borderRadius: '8px',
                                                        }}
                                                        label={
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItem:
                                                                        'center',
                                                                    gap: '1rem',
                                                                }}
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: '40px',
                                                                    }}
                                                                    src={
                                                                        cashOnDelivery
                                                                    }
                                                                    alt=""
                                                                />
                                                                <label
                                                                    style={{
                                                                        margin: 'auto 0',
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Cash on
                                                                    Delivery
                                                                </label>
                                                            </div>
                                                        }
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <Button
                                        loader={loading}
                                        style={{
                                            width: '200px',
                                            margin: '0 auto',
                                        }}
                                        primary
                                        type="submit"
                                    >
                                        Payment
                                    </Button>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default FormPayment;
