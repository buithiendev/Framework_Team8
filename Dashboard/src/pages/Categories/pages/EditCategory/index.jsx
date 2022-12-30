import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import DropFileInput from '~/components/CustomField/DropFileInput';
import EditorField from '~/components/CustomField/EditorField';
import InputField from '~/components/CustomField/InputField';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { getCategoryById } from '~/utils/CategoriesAPIRoutes';
import { updateCategory } from '../../categoriesSlice';
import AddOrEditSeries from './components/AddOrEditSeries';
import styles from './EditCategory.module.scss';

const cx = classNames.bind(styles);

function EditCategory() {
    const dispatch = useDispatch();
    const params = useParams();
    const [categoryCurrent, setCategoryCurrent] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        (async () => {
            const category = await axios.get(`${getCategoryById}/${params.id}`);
            if (category) {
                setCategoryCurrent(category.data);
            }
        })();
    }, []);

    const initialValues = {
        name: (categoryCurrent && categoryCurrent.name) || '',
        description: (categoryCurrent && categoryCurrent.description) || '',
        imageslide: [],
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    const handleOnSubmit = (values) => {
        const { name, description, imageslide } = values;
        const id = params.id;
        const linksImage = categoryCurrent.linksImage;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('id', id);
        formData.append('linksImage', JSON.stringify(linksImage));
        imageslide.map((image) => {
            formData.append('Image', image);
        });
        dispatch(updateCategory(formData));
    };

    const imageRemove = (link) => {
        const newLinks = categoryCurrent.linksImage.filter(
            (_link) => _link !== link,
        );
        const newCategoryCurrent = { ...categoryCurrent, linksImage: newLinks };
        setCategoryCurrent(newCategoryCurrent);
    };

    return (
        <Container>
            <HeaderChild title="Edit Category And Series" />
            <div className={cx('content')}>
                {categoryCurrent && (
                    <div className={cx('left-content')}>
                        <Paper>
                            <HeaderChild small title="Edit Category" />

                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleOnSubmit}
                                validationSchema={validationSchema}
                            >
                                {(formikProps) => {
                                    return (
                                        <Form className={cx('form-wrap')}>
                                            <FastField
                                                name="name"
                                                component={InputField}
                                                label="Name"
                                                placeholder="Type here"
                                            />

                                            <FastField
                                                name="description"
                                                label="Description"
                                                stateChange={setDescription}
                                                component={EditorField}
                                            />
                                            <FastField
                                                name="imageslide"
                                                component={DropFileInput}
                                                label="Slide image"
                                                placeholder="Type here"
                                            />
                                            {categoryCurrent.linksImage && (
                                                <>
                                                    <p
                                                        className={cx(
                                                            'picture-title',
                                                        )}
                                                    >
                                                        Old picture
                                                    </p>
                                                    <div
                                                        className={cx(
                                                            'image-slide',
                                                        )}
                                                    >
                                                        {categoryCurrent.linksImage.map(
                                                            (link, index) => {
                                                                return (
                                                                    <div
                                                                        key={uuidv4()}
                                                                        className={cx(
                                                                            'image-wrap',
                                                                        )}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                link
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <span
                                                                            className={cx(
                                                                                'delete-image-btn',
                                                                            )}
                                                                            onClick={() =>
                                                                                imageRemove(
                                                                                    link,
                                                                                )
                                                                            }
                                                                        >
                                                                            <BiXCircle />
                                                                        </span>
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                            <Button
                                                type="submit"
                                                loader={false}
                                                primary
                                                style={{
                                                    margin: '10px auto',
                                                    width: '50%',
                                                }}
                                            >
                                                Update Category
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Paper>
                    </div>
                )}
                <AddOrEditSeries />
            </div>
        </Container>
    );
}

export default EditCategory;
