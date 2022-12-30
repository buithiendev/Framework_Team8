import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiNavigation, BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import {
    deleteProduct,
    getProductByIdName,
    updateProduct,
} from '~/utils/ProductAPIRoutes';
import FormProduct from './components/FormProduct';
import styles from './EditProduct.module.scss';

const cx = classNames.bind(styles);

function EditProduct() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resProduct = await axios.get(
                `${getProductByIdName}/${params.id}`,
            );

            if (resProduct.data) {
                setProduct(resProduct.data);
            }
        })();
    }, []);

    const initialValues = {
        categoryId: (product && product.categoryId) || '',
        seriesId: (product && product.seriesId) || '',
        name: (product && product.name) || '',
        description: (product && product.description) || '',
        details: (product && product.details) || '',
        newPrice: (product && product.newPrice) || 0,
        oldPrice: (product && product.newPrice) || 0,
        sticker: (product && product.sticker) || '',
        promotionInfo: (product && product.promotionInfo) || '',
        specifications: (product && product.specifications) || '',
        imagePreview: (product && product.linksImage) || [],
        rams: (product && product.rams) || [],
        memoryStorages: (product && product.memorys) || [],
        colors: (product && product.colors) || [],
    };

    const handleOnSubmit = async (values) => {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            newPrice,
            oldPrice,
            promotionInfo,
            specifications,
            imagePreview,
            sticker,
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
        formData.append('sticker', sticker);
        formData.append('newPrice', newPrice);
        formData.append('oldPrice', oldPrice);
        formData.append('promotionInfo', promotionInfo);
        formData.append('specifications', specifications);
        formData.append(
            'imagePreview',
            JSON.stringify(
                imagePreview?.filter((link) => typeof link === 'string'),
            ),
        );
        formData.append('rams', rams);
        formData.append('memoryStorages', memoryStorages);
        formData.append('colors', JSON.stringify(colors));
        imagePreview.map((image) => {
            if (typeof image != 'string') formData.append('Image', image);
        });

        const addData = async () => {
            const response = await axios.post(
                `${updateProduct}/${product._id}`,
                formData,
            );
            return response.data;
        };

        toast.promise(
            addData,
            {
                pending: 'Đang cập nhật sản phẩm. Vui lòng chờ',
                success: 'Cập nhật thành công',
                error: 'Cập nhật thất bại',
            },
            {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
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

    const handleDeleteProduct = async (id) => {
        const res = await axios.post(`${deleteProduct}/${id}`);

        if (res?.data.isDelete) {
            navigate('/products');
        }
    };

    return (
        <Container>
            <HeaderChild title="Edit Product">
                <Button
                    outline
                    small
                    style={{ color: 'red', borderColor: 'red' }}
                    leftIcon={<BiTrash />}
                    onClick={() => {
                        handleDeleteProduct(product._id);
                    }}
                >
                    Delete This Product
                </Button>

                <Button
                    small
                    primary
                    to="/products/add"
                    leftIcon={<BiNavigation />}
                >
                    Go to product
                </Button>
            </HeaderChild>
            <div className={cx('content')}>
                <Paper>
                    {product && (
                        <FormProduct
                            initialValues={initialValues}
                            handleOnSubmit={handleOnSubmit}
                        />
                    )}
                </Paper>
            </div>
            <ToastContainer />
        </Container>
    );
}

export default EditProduct;
