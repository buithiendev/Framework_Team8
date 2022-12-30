import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import {
    BiBookmarkAltPlus,
    BiEdit,
    BiPlusCircle,
    BiSearch,
} from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SwitchField from '~/components/CustomField/SwitchField';
import FakeButton from '~/components/FakeButton';
import { updateSeries } from '../../seriesSlice';
import styles from './SeriesItem.module.scss';

const cx = classNames.bind(styles);

function SeriesItem({ id, nameSeries, description, statusSeries }) {
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const dispatch = useDispatch();
    const initialValuesFormUpdate = {
        name: nameSeries ? nameSeries : '',
        status: statusSeries ? statusSeries : true,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    const handleOnSubmit = async (values) => {
        const { name, status } = values;
        const categoryId = id;
        dispatch(updateSeries({ name, status, categoryId }));
        setTimeout(() => {}, 2000);
    };

    const navigateAddProduct = () => {
        navigate('/products/add');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('quick-view')}>
                    <p className={cx('name')}>
                        <BiBookmarkAltPlus size={15} />{' '}
                        <span>{nameSeries}</span>
                    </p>
                    <div className={cx('action')}>
                        <Button
                            primary
                            leftIcon={<BiEdit />}
                            smallest
                            onClick={() => {
                                setShowEdit((prev) => !prev);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            primary
                            leftIcon={<BiPlusCircle />}
                            onClick={navigateAddProduct}
                            smallest
                        >
                            Add product
                        </Button>
                        <Button primary leftIcon={<BiSearch />} smallest>
                            View
                        </Button>
                    </div>
                </div>
            </div>
            {showEdit && (
                <div className={cx('form-edit-name')}>
                    <Formik
                        initialValues={initialValuesFormUpdate}
                        onSubmit={handleOnSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps) => {
                            return (
                                <Form className={cx('form-wrap')}>
                                    <FastField
                                        name="name"
                                        label="Name"
                                        component={InputField}
                                        placeholder="Type here"
                                    />
                                    <FastField
                                        name="status"
                                        label="Business status"
                                        component={SwitchField}
                                        defaultChecked={statusSeries}
                                    />
                                    <div className={cx('group-btn')}>
                                        <Button
                                            type="submit"
                                            loader={false}
                                            small
                                            primary
                                            style={{
                                                margin: '10px 0',
                                                width: '20%',
                                                fontSize: '1.3rem',
                                            }}
                                        >
                                            Update
                                        </Button>
                                        <FakeButton
                                            type="cancle"
                                            loader={false}
                                            onClick={() => {
                                                setShowEdit(false);
                                            }}
                                            small
                                            outline
                                            style={{
                                                margin: '10px 0',
                                                width: '15%',
                                                fontSize: '1.3rem',
                                            }}
                                        >
                                            Cancel
                                        </FakeButton>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            )}
        </div>
    );
}

export default SeriesItem;
