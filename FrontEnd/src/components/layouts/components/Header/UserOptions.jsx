import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { BiLogIn, BiLogOut, BiUser, BiUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '~/app/currentUserSlice';
import cr from '~/assets/images/cr.jpg';
import { logout } from '~/utils/customerRoute';

function UserOptions({ avatar }) {
    const dispatch = useDispatch();
    const { status, info } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const { data } = await axios.post(
            logout,
            {},
            { withCredentials: true },
        );
        if (data.status) {
            dispatch(clearCurrentUser());
            navigate('/login');
        }
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                    borderRadius: '6px',
                    padding: '4px 16px',
                    display: 'flex',
                    alignItem: 'center',
                }}
            >
                {/* {info && <p style={{ marginRight: '16px', fontSize: 14, marginBottom: 0 }}>{`${info.lastName}`}</p>} */}
                <BiUser color="white" size={20} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        overflow: 'visible',
                        padding: '4px 18px',
                        mt: 1.5,
                        width: 250,
                        '& .MuiMenuItem-root': {
                            display: 'flex',
                            gap: '10px',
                            fontSize: 14,
                            fontFamily: 'Poppins, sans-serif',
                            py: 1.2,
                            color: '#000',

                            '&:hover': {
                                borderRadius: '8px',
                                color: '#0066CC',
                            },
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 18,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        '& a': {
                            color: 'var(--text-color)',
                            textDecoration: 'none',
                        },

                        '& a svg': {
                            fontSize: 18,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {status ? (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItem: 'center',
                                gap: '1rem',
                                marginBottom: '12px',
                            }}
                        >
                            <Avatar
                                alt=""
                                sx={{ width: 35, height: 35 }}
                                src={cr}
                            ></Avatar>
                            <h4 style={{ margin: 'auto 0' }}>
                                {info?.fullName}
                            </h4>
                        </div>
                        <Divider />
                        <Link to="/customer/my-profile">
                            <MenuItem>
                                <BiUserCircle /> My Profile
                            </MenuItem>
                        </Link>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            {' '}
                            <BiLogOut /> Logout
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <Link to="/register">
                            <MenuItem>Create An Account Now</MenuItem>
                        </Link>
                        <Divider />
                        <Link to="/login">
                            <MenuItem>
                                {' '}
                                <BiLogIn /> Login now
                            </MenuItem>
                        </Link>
                    </div>
                )}
            </Menu>
        </>
    );
}

export default UserOptions;
