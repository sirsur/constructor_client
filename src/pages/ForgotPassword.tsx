import { TextField, Box, Button, Link } from "@mui/material";
import React from "react";
import { gql, useLazyQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';

const SENDLINK = gql`
    query SendLink($input: forgotPassword!) {
        sendLink(input: $input) 
    }
`;

export default function ForgotPassword() {
    const [emailLink, setEmail] = React.useState('');

    const [link, { data, loading, error }] = useLazyQuery(SENDLINK);

    if (error) { 
        return (<p>{error?.message}</p>);
    }

    if (loading) { 
        return (<p>loading</p>);
    }

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <Box sx={{ 
                flexGrow: '0.5',
                display: 'flex',
                width: '100%',
                pt: '1vh',
                pl: '1vh'
            }}>
                <Link component={RouterLink} to='/'>back to main</Link>
            </Box>
            <h1>Forgot password</h1>
            { data && <p>Check your email</p> }
            <Box component='form'
            sx={{ 
                width: '33%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1vh'
            }}
            onSubmit={() => link({ variables: { input: { emailLink } } })}>
                <TextField
                    label='Email' 
                    name='email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <Button variant="contained" color="primary" type='submit'>Send confirmation</Button>
            </Box>
        </Box>
    )
}