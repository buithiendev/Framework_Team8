import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
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
import Button from '~/components/Button';
import HighLight from '~/components/HighLight';
import { updateStatusUser } from '../../../../usersSlice';
import { useNavigate } from 'react-router';
import {v4 as uuidv4} from 'uuid'

const columns = [
    { id: 'stt', label: '#', minWidth: 40 },
    { id: 'fullName', label: 'Full Name', minWidth: 80 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 50,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'role',
        label: 'Role',
        minWidth: 50,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'changeStatus',
        label: 'On/Off Status',
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

function TableUsers({ users }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    function createData(_id, firstName, lastName, phone, role, status, email) {
        const fullName = firstName + ' ' + lastName;

        const changeStatus = (
            <Switch
                onChange={(e) => {
                    const checked = e.target.checked;
                    const dataSent = {
                        id: _id,
                        status: checked,
                    };
                    dispatch(updateStatusUser(dataSent));
                }}
                defaultChecked={status}
            />
        );
        status = status ? (
            <HighLight primary small>
                Active
            </HighLight>
        ) : (
            <HighLight outline small>
                Non-Active
            </HighLight>
        );
        const action = (
            <>
                <Button
                    primary
                    style={{  height: 25, fontSize: '1.2rem' }}
                    onClick={() => {navigate(`/users/edit/${_id}`)}}
                    leftIcon={<BiEdit />}
                >
                    Edit
                </Button>
            </>
        );
        return { fullName, email, phone, role, status, changeStatus, action };
    }

    function changeListUsers(users) {
        return users.map((user) => {
            const { _id, firstName, lastName, phone, role, status, email } = user;
            return createData(_id, firstName, lastName, phone, role, status, email);
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
            }}
        >
            <TableContainer sx={{ height: 620 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {changeListUsers(users)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                                        {columns.map((column) => {
                                            let value;
                                            column.id === 'stt' ? (value = index + 1) : (value = row[column.id]);
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(TableUsers);
