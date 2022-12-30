import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { memo } from 'react';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import styles from './FormBanner.module.scss';

const cx = classNames.bind(styles);

function FormBanner({
    initialValues,
    handleOnSubmit,
    validationSchema,
    isUpdate,
    loading,
}) {
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return (
                        <Form className={cx('form-wrap')}>
                            <FastField
                                name="address"
                                component={InputField}
                                label="Address Store"
                                placeholder="Phạm Ngũ Lão Q4, TPHCM"
                            />
                            <FastField
                                name="phone"
                                component={InputField}
                                label="Phone Number"
                                placeholder="+848173489"
                            />
                            <FastField
                                name="email"
                                component={InputField}
                                label="Email Store"
                                placeholder="deathshop_quan4@gmail.com"
                            />
                            <Button
                                loader={loading}
                                type="submit"
                                primary
                                style={{
                                    margin: '10px auto',
                                    width: '20%',
                                }}
                            >
                                Add Store
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default memo(FormBanner);
