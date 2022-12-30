import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import StoresTable from './components/StoresTable';

const MainStore = () => {
    const stores = useSelector((state) => state.stores.stores);

    return (
        <Container
            style={{
                height: '100%',
                margin: '0 40px',
                paddingTop: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderChild title="Stores">
                <Button small outline to="/stores/add">
                    → Add Store
                </Button>
            </HeaderChild>
            <StoresTable stores={stores} />
        </Container>
    );
};

export default MainStore;
