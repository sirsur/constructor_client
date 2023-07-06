import { Box, Button, Link, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import client from "../../apolloClient";

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

const GETUSERNAME = gql`
    query GetUsernameByUserId {
        getUsernameByUserId
    }
`;

export default function MenuComponent() {
    const navigate = useNavigate();

    const [modalUser, setModalUser] = React.useState<null | HTMLElement>(null);
    const open = Boolean(modalUser);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setModalUser(event.currentTarget);
    };
    const handleClose = () => {
        setModalUser(null);
    };

    const [logout, { data, loading, error }] = useMutation(LOGOUT);

    const { data: dataUsername, loading: loadingUsername } = useQuery(GETUSERNAME);

    if (data) {
        client.clearStore()
        navigate('/login');
    }

    if (error) { 
        return (<p>{error?.message}</p>);
    }

    if (loading || loadingUsername) { 
        return (<p>loading</p>);
    }

    if (dataUsername !== undefined) {
        const username = dataUsername.getUsernameByUserId;
        return (
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Box component="img" src={process.env.PUBLIC_URL + './img/logo.svg'} alt='logo' 
                    sx={{
                        height: '40px'
                }} />
                <Button 
                    sx={{ p: 0 }} 
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >{username}</Button>
                <Menu 
                    id="fade-menu"
                    MenuListProps={{
                    "aria-labelledby": "fade-button"
                    }}
                    anchorEl={modalUser}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem><Link component={RouterLink} to='/userSettings'>settings</Link></MenuItem>
                    <MenuItem><Link component={RouterLink} to='/projects'>projects</Link></MenuItem>
                    <MenuItem><Button variant="contained" color="primary" onClick={() => { logout() }}>logout</Button></MenuItem>
                </Menu>
            </Box>
        );
    }
}