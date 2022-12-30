import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { memo, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Button from '~/components/Button';

const columns = [
    { id: 'stt', label: '#', minWidth: 40, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 80, align: 'center' },
    { id: 'phone', label: 'Phone', minWidth: 80, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 80, align: 'center' },
    {
        id: 'action',
        label: 'Action',
        minWidth: 70,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

function StoresTable({ stores }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function createData(address, phone, email, _id) {
        const action = (
            <>
                <Button
                    smallest
                    primary
                    style={{ height: 25, fontSize: '1.2rem' }}
                    onClick={() => {
                        navigate(`edit/${_id}`);
                    }}
                    leftIcon={<BiEdit />}
                ></Button>
            </>
        );
        return {
            address,
            phone,
            email,
            action,
        };
    }

    function changeListStores(stores) {
        return stores?.map((s) => {
            const { address, phone, email, _id } = s;
            return createData(address, phone, email, _id);
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
                        {changeListStores(stores)
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
                count={stores?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(StoresTable);
