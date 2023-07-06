import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LOGIN = gql`
    mutation Login($input: login!) {
        login(input: $input) {
            username
            password
        }
    }
`;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);

    const [login, { data, loading }] = useMutation(LOGIN, {
        onError: (err) => {
            setError(err.message);
        }
    });

    if (data) {
        navigate('/projects');
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
            <h1>Login</h1>
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
                    login({ variables: { input: formData } });
                }}
            >
                {error}
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
                    label='Password' 
                    name='password'
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [e.target.name]:e.target.value
                        })
                    }}
                    InputProps={{ 
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Link component={RouterLink} to='/forgotPassword'>Forgot Password</Link>
                <Button variant="contained" color="primary" type='submit'>Submit</Button>
            </Box>
        </Box>
    );
};
