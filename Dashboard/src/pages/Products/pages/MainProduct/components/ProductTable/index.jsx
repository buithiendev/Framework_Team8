import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { memo, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Button from '~/components/Button';
import { changeStatus as changeStatusAPI } from './../../../../../../utils/ProductAPIRoutes';

const columns = [
    { id: 'stt', label: '#', minWidth: 40, align: 'center' },
    {
        id: 'thumb',
        label: 'Image',
        minWidth: 40,
        align: 'left',
    },
    { id: 'name', label: 'Product Name', minWidth: 80, align: 'center' },
    { id: 'category', label: 'Category', minWidth: 80, align: 'center' },
    { id: 'series', label: 'Series', minWidth: 80, align: 'center' },
    {
        id: 'ram',
        label: 'Ram',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'memory',
        label: 'Memory',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'changeStatus',
        label: 'Open/Stop Sell',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 70,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

function ProductTable({ products }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function createData(
        name,
        linksImage,
        categoryId,
        seriesId,
        newPrice,
        rams,
        memorys,
        colors,
        status,
        id,
        _id,
    ) {
        const thumb = (
            <img
                style={{
                    height: '80px',
                    maxWidth: '80px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                }}
                alt=""
                src={linksImage[0]}
            />
        );
        const quantity = colors?.reduce((total, curr) => {
            return total + 1 * curr.quantity;
        }, 0);

        const changeStatus = (
            <Switch
                onChange={async (e) => {
                    const newStatus = e.target.checked;
                    await axios.post(`${changeStatusAPI}/${_id}`,{newStatus});
                }}
                defaultChecked={status}
            />
        );
        const action = (
            <>
                <Button
                    smallest
                    primary
                    style={{ height: 25, fontSize: '1.2rem' }}
                    onClick={() => {
                        navigate(`edit/${id}`);
                    }}
                    leftIcon={<BiEdit />}
                >
                </Button>
            </>
        );
        return {
            name,
            thumb,
            quantity,
            changeStatus,
            action,
            price: newPrice,
            ram: rams,
            memory: memorys,
            category: categoryId.name,
            series: seriesId.name,
        };
    }

    function changeListProducts(products) {
        return products?.map((p) => {
            const {
                name,
                linksImage,
                categoryId,
                seriesId,
                newPrice,
                rams,
                memorys,
                colors,
                status,
                id,
                _id,
            } = p;
            return createData(
                name,
                linksImage,
                categoryId,
                seriesId,
                newPrice,
                rams,
                memorys,
                colors,
                status,
                id,
                _id,
            );
        });
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
                Width: '100%',
                overflow: 'hidden',
                marginTop: '24px',
            }}
        >
            <TableContainer sx={{ height: 620 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {changeListProducts(products)
                            ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            ?.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={uuidv4()}
                                    >
                                        {columns.map((column) => {
                                            let value;
                                            column.id === 'stt'
                                                ? (value = index + 1)
                                                : (value = row[column.id]);
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    fontSize: 16,
                    '& .MuiButtonBase-root': {
                        '& svg': {
                            fontSize: 25,
                        },
                    },
                }}
                rowsPerPageOptions={[8, 25, 100]}
                component="div"
                count={products?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(ProductTable);
