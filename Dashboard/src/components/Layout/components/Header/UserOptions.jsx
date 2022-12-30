import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { BiUserCircle, BiLogOut, BiCog } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserOptions({ avatar }) {
    const { info } = useSelector((state) => state.currentUser);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        localStorage.setItem('current-user', JSON.stringify(undefined));
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
                    border: '1px solid #ccc',
                    display: 'flex',
                    alignItem: 'center',
                }}
            >
                {info && <p style={{ marginRight: '16px', fontSize: 14, marginBottom: 0 }}>{`${info.lastName}`}</p>}
                <Avatar alt="avt" src={avatar} />
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
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: 150,
                        '& .MuiMenuItem-root': {
                            display: 'flex',
                            gap: '10px',
                            fontSize: 14,
                            fontFamily: 'Poppins, sans-serif',
                            py: 1.2,
                            color: 'var(--text-color)',

                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                                color: '#fff',
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
                        }
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link>
                    <MenuItem><BiUserCircle/> My Profile</MenuItem>
                </Link>
                <Divider />
                <Link to="/login">
                    <MenuItem onClick={handleLogout}> <BiLogOut/> Logout</MenuItem>
                </Link>
            </Menu>
        </>
    );
}

export default UserOptions;
