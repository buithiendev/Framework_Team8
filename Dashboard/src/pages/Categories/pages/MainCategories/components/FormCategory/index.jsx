import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '~/components/Button';
import DropFileInput from '~/components/CustomField/DropFileInput';
import EditorField from '~/components/CustomField/EditorField';
import InputField from '~/components/CustomField/InputField';
import styles from './FormCategory.module.scss'

const cx = classNames.bind(styles);


function FormCategory({ initialValues, handleOnSubmit }) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });


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
                            <div className={cx('group')}>
                                <div className={cx('left-group')}>
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        label="Name"
                                        placeholder="Type here"
                                    />
                                    <FastField
                                        name="imageslide"
                                        component={DropFileInput}
                                        label="Slide image"
                                        placeholder="Type here"
                                    />
                                </div>

                                <div style={{ maxWidth: '896px' }}>
                                    <FastField
                                        name="description"
                                        label="Description"
                                        component={EditorField}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                loader={false}
                                primary
                                style={{
                                    margin: '10px auto',
                                    width: '20%',
                                }}
                            >
                                Create Category
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default FormCategory;
