import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { memo } from 'react';
import Button from '~/components/Button';
import DropFileInput from '~/components/CustomField/DropFileInput';
import InputField from '~/components/CustomField/InputField';
import styles from './FormBanner.module.scss';

const cx = classNames.bind(styles);

function FormStore({
    initialValues,
    handleOnSubmit,
    validationSchema,
    isUpdate,
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
                                name="linkBanner"
                                component={InputField}
                                label="Link Banner"
                                placeholder="http://localhost:3000/shop/iphone"
                            />
                            <FastField
                                name="image"
                                component={DropFileInput}
                                single
                                required
                                label="Image preview"
                                placeholder="Type here"
                            />
                            <Button
                                type="submit"
                                loader={false}
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

export default memo(FormStore);
