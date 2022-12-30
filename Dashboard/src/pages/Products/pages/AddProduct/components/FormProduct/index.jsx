import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import ColorField from '~/components/CustomField/ColorField';
import DropFileInput from '~/components/CustomField/DropFileInput';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import { optionsMemory, optionsRam } from '~/constants/optionProduct';
import TabInput from '../TabInput';
import styles from './FormProduct.module.scss';

const cx = classNames.bind(styles);

const optionCategory = [];
const optionSeries = [];

function FormProduct({
    initialValues,
    handleOnSubmit,
    validationSchema,
    isUpdate,
}) {
    const categories = useSelector((state) => state.categories.categories);
    const [categoryId, setCategoryId] = useState();
    const series = useSelector((state) => state.series.series);

    useEffect(() => {
        categories.map((category) => {
            optionCategory.push({ value: category._id, label: category.name });
        });
    }, [categories]);

    useEffect(() => {
        if (categoryId) {
            optionSeries.splice(0, optionSeries.length);
            series.map((seri) => {
                if (seri.categoryId === categoryId.value) {
                    optionSeries.push({
                        value: seri._id,
                        label: seri.name,
                    });
                }
            });
        }
    }, [categoryId]);


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
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <FastField
                                    name="categoryId"
                                    label="Category Id"
                                    component={SelectField}
                                    onChange={setCategoryId}
                                    placeholder="Choose a category ..."
                                    options={optionCategory}
                                />
                                <FastField
                                    name="seriesId"
                                    label="Series Id"
                                    component={SelectField}
                                    placeholder="Choose a series ..."
                                    options={optionSeries}
                                />
                            </div>
                            <FastField
                                name="name"
                                component={InputField}
                                label="Name"
                                placeholder="Iphone 14..."
                            />
                            <FastField
                                name="imagePreview"
                                component={DropFileInput}
                                label="Image preview"
                                placeholder="Type here"
                            />
                            <FastField
                                name="sticker"
                                component={InputField}
                                label="Sticker"
                                placeholder="Hot Deal..."
                            />
                            <FastField
                                name="newPrice"
                                component={InputField}
                                label="New Price"
                                placeholder="32.000.000 VND"
                            />
                            <FastField
                                name="rams"
                                component={SelectField}
                                label="RAM"
                                options={optionsRam}
                            />
                            <FastField
                                name="memoryStorages"
                                component={SelectField}
                                label="Memory Storage"
                                options={optionsMemory}
                            />
                            <FastField
                                name="colors"
                                mode="tags"
                                component={ColorField}
                                label="Colors"
                            />
                            <TabInput />
                            <Button
                                type="submit"
                                loader={false}
                                primary
                                style={{
                                    margin: '10px auto',
                                    width: '20%',
                                }}
                            >
                                Create Product
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default memo(FormProduct);
