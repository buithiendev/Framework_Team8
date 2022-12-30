import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import DropFileInput from '~/components/CustomField/DropFileInput';
import EditorField from '~/components/CustomField/EditorField';
import InputField from '~/components/CustomField/InputField';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { addCategory } from '../../categoriesSlice';
import styles from './Categories.module.scss';
import FormCategory from './components/FormCategory';
import TableCategories from './components/TableCategories';

const cx = classNames.bind(styles);

function MainCategories() {
    const [description, setDescription] = useState('');
    const { success } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        description: '',
        imageslide: [],
    };

    const handleOnSubmit = (values, onSubmitProps) => {
        console.log(values);
        const { name, description, imageslide } = values;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        imageslide.map((image) => {
            formData.append('Image', image);
        });
        dispatch(addCategory(formData));
        if (success) {
            onSubmitProps.resetForm();
            console.log(initialValues);
        }
    };
    return (
        <Container>
            <HeaderChild title="Categories">
                <Button small outline to="/products">
                    → Go to products
                </Button>
            </HeaderChild>
            <div className={cx('content')}>
                <div className={cx('left-content')}>
                    <Paper>
                        <FormCategory
                            initialValues={initialValues}
                            handleOnSubmit={handleOnSubmit}
                        />
                    </Paper>
                </div>
                <div className={cx('categories')}>
                    <TableCategories />
                </div>
            </div>
        </Container>
    );
}

export default MainCategories;
