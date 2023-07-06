import { Box, Button, Dialog, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import MenuComponent from './components/MenuComponent';
import client from "../apolloClient";
import React from 'react';

const ISAUTH = gql`
    query IsAuth {
        isAuth
    }
`;

const GETUSERNAME = gql`
    query GetUsernameByUserId {
        getUsernameByUserId
    }
`;

const GETEMAIL = gql`
    query GetEmailByUserId {
        getEmailByUserId
    }
`;

const SENDLINK = gql`
    query SendLink($input: forgotPassword!) {
        sendLink(input: $input)
    }
`;

const DELETEACCOUNT = gql`
    mutation DeleteAccount($input: deleteAccount!) {
        deleteAccount(input: $input)
    }
`;

const CHANGEUSERNAME = gql`
    mutation ChangeUsername($input: changeUsername!) {
        changeUsername(input: $input)
    }
`;

export default function User() {
    const navigate = useNavigate();

    const [modalState, setModalState] = React.useState(false);

    const [errorLink, setErrorLink] = React.useState(null);
    const [errorDel, setErrorDel] = React.useState(null);
    const [error, setError] = React.useState(null);

    const [usernameChanged, setUsernameChanged] = React.useState({
        oldName: "",
        newName: ""
    });

    const { data } = useQuery(ISAUTH);

    const { data: dataUsername, loading: loadingUsername } = useQuery(GETUSERNAME);

    const { data: dataEmail, loading: loadingEmail } = useQuery(GETEMAIL);

    const [link, { data: dataLink, loading: loadingLink }] = useLazyQuery(SENDLINK, {
        onError: (err) => {
            setErrorLink(err);
        }
    });

    const [del, { data: dataDel, loading: loadingDel }] = useMutation(DELETEACCOUNT, {
        onError: (err) => {
            setErrorDel(err);
        }
    });

    const [changeUsername, { loading: loadingChangeUsername }] = useMutation(CHANGEUSERNAME, {
        onError: (err) => {
            setError(err.message);
        },
        onCompleted: () => {
            setError(null);
        },
        refetchQueries: [
            {query: GETUSERNAME}
        ],
    });

    if (data !== undefined) {
        if (data['isAuth'] === false) {
            navigate('/refresh');
        }
    } else {
        navigate('/refresh');
    }

    if (dataDel) {
        client.clearStore()
        navigate('/registration');
    }

    if (loadingUsername || loadingEmail || loadingLink || loadingDel || loadingChangeUsername) { 
        return (<p>loading</p>);
    }

    if (dataUsername && dataEmail !== undefined) {
        const username = dataUsername.getUsernameByUserId;
        const toEmail = dataEmail.getEmailByUserId;

        return (
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                px: '2vw',
                py: '2vh'
            }}>
                <MenuComponent />
                <Box
                    component='form'
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1vw'
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        changeUsername({ variables: { input: usernameChanged } });
                    }}
                >
                    { error }
                    <TextField 
                        size='small'
                        defaultValue={username} 
                        name='newName'
                        onChange={(e) => {
                            setUsernameChanged({
                                ...usernameChanged,
                                [e.target.name]:e.target.value,
                                oldName: username
                            });
                        }}
                    />
                    <Button variant='contained' color='primary' type='submit'>Change username</Button>
                </Box>
                <Box>email: {toEmail}</Box>
                <Button variant='contained' color='primary' onClick={() => link({ variables: { input: { emailLink: toEmail }}})}>Change password</Button>
                <Button variant='contained' color='primary' onClick={ () => setModalState(true) }>Delete account</Button>
                <Dialog 
                    PaperProps={{ sx: { 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: '4vw',
                        py: '2vh'
                    }}}
                    open={ modalState }
                    onClose={ () => setModalState(false) }
                    aria-describedby="modal-modal-description"
                >
                    <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                        Are you sure you want to delete your account?
                    </Typography>
                    <Button variant='contained' color='primary' onClick={() => del({ variables: { input: { toEmail } } })}>Delete account</Button>
                </Dialog>
                { dataLink && <p>Check your email</p> }
                { errorLink && <p>Error occured</p> }
                { errorDel && <p>Error occured</p> }
            </Box>
        );
    }
};
