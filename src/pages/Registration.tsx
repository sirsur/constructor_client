import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, TextField } from '@mui/material';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const REGISTRATION = gql`
    query Register($input: registration!) {
        register(input: $input)
    }
`;


export default function Registration() {
    const [formData, setFormData] = useState({});

    const [error, setError] = useState(null);

    const [register, { data, loading }] = useLazyQuery(REGISTRATION, {
        onError: (err) => {
            setError(err.message);
        }
    });

    if (data) {
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
                <h1>Registration</h1>
                <p>Check your email</p>
            </Box>
        );
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
            <h1>Registration</h1>
            {error}
            <Box 
                component='form'
                sx={{ 
                    width: '33%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh'
                }}
                onSubmit={e => {
                    e.preventDefault();
                    register({ variables: { input: formData } });
                }}
            >
                <TextField 
                    label='Username' 
                    name='username'
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [e.target.name]:e.target.value
                        })
                    }}
                />
                <TextField 
                    label='Email' 
                    name='email'
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [e.target.name]:e.target.value
                        })
                    }}
                />
                <TextField 
                    label='Password' 
                    name='password'
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [e.target.name]:e.target.value
                        })
                    }}
                />
                <Button variant='contained' color='primary' type='submit'>Submit</Button>
            </Box>
        </Box>
    );
};
