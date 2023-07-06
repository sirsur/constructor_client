import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const CHANGEPASSWORD = gql`
    mutation ChangePassword($input: changePassword!) {
        changePassword(input: $input) 
    }
`;

export default function ChangePassword() {
    const params = useParams();
    const token = params.token;

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({});
    React.useEffect(() => {
        setFormData({
            ...formData,
            token
        });
        // eslint-disable-next-line
    }, [])

    const [error, setError] = React.useState(null);

    const [password, { data, loading}] = useMutation(CHANGEPASSWORD, {
        onError: (err) => {
            setError(err);
        }
    });

    if (data) {
        navigate('/login');
    }

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
            justifyContent: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <h1>Change password</h1>
            {error && <p>Error</p>}
            <Box component='form'
            sx={{ 
                width: '33%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1vh'
            }}
            onSubmit={() => password({ variables: { input: formData } })}>
                <TextField
                    label='Password' 
                    name='newPassword'
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [e.target.name]:e.target.value
                        })
                    }}
                />
                <Button variant="contained" color="primary" type='submit'>Submit</Button>
            </Box>
        </Box>
    )
}