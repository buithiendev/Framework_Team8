import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import { addStore } from '../storesSlice';
import FormStore from './components/FormStore';

const AddStore = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        address: '',
        email: '',
        phone: '',
    };

    const validationSchema = Yup.object().shape({
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
    });

    const handleOnSubmit = (values, { resetForm }) => {
        setLoading(true);
        dispatch(addStore(values));
        setTimeout(() => {
            setLoading(false);
            toast('Thêm cửa hàng thành công!', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            resetForm();
        }, 2000);
    };

    return (
        <Container>
            <HeaderChild title="Banner Advertisement">
                <Button small outline to="/stores">
                    → Back Stores
                </Button>
            </HeaderChild>
            <FormStore
                validationSchema={validationSchema}
                initialValues={initialValues}
                handleOnSubmit={handleOnSubmit}
                loading={loading}
            />
            <ToastContainer />
        </Container>
    );
};

export default AddStore;
