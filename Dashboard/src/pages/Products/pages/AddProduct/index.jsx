import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import '~/assets/css/common.css';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { addProductRoute } from '~/utils/ProductAPIRoutes';
import styles from './AddProduct.module.scss';
import FormProduct from './components/FormProduct';

const cx = classNames.bind(styles);

function AddProduct() {
    const navigate = useNavigate();

    const initialValues = {
        categoryId: '',
        seriesId: '',
        name: '',
        description: '',
        details: '',
        newPrice: 0,
        sticker: '',
        promotionInfo: '',
        specifications: '',
        imagePreview: [],
        rams: '',
        memoryStorages: '',
        colors: [],
    };

    const handleOnSubmit = async (values, { resetForm }) => {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            newPrice,
            sticker,
            promotionInfo,
            specifications,
            imagePreview,
            rams,
            memoryStorages,
            colors,
        } = values;

        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('seriesId', seriesId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('details', details);
        formData.append('newPrice', newPrice);
        formData.append('sticker', sticker);
        formData.append('promotionInfo', promotionInfo);
        formData.append('specifications', specifications);
        formData.append('imagePreview', imagePreview);
        formData.append('rams', rams);
        formData.append('memoryStorages', memoryStorages);
        formData.append('colors', JSON.stringify(colors));
        imagePreview.map((image) => {
            formData.append('Image', image);
        });

        const myPromise = new Promise((resolve) =>
            axios
                .post(addProductRoute, formData)
                .then((response) => response.data)
                .then((data) => {
                    resetForm()
                    setTimeout(() => resolve(data), 2000);
                }),
        );

        toast.promise(myPromise, {
            pending: 'Đang sản phẩm. Vui lòng chờ',
            success: 'Thêm sản phẩm thành công',
            error: 'Thêm sản phẩm thất bại',
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
        categoryId: Yup.string().required('Please select product category'),
        seriesId: Yup.string().required('Please select product series'),
        newPrice: Yup.string().required('Please select product series'),
    });

    return (
        <Container>
            <HeaderChild title="Add Product">
                <Button small outline to="/products/add">
                    → Go to product
                </Button>
            </HeaderChild>
            <div className={cx('content')}>
                <Paper>
                    <FormProduct
                        initialValues={initialValues}
                        handleOnSubmit={handleOnSubmit}
                        validationSchema={validationSchema}
                    />
                </Paper>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Container>
    );
}

export default AddProduct;
