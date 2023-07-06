import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useParams } from "react-router-dom";

const EMAIL_VALIDATION = gql`
    mutation EmailValidation($token: String!) {
        emailValidation(token: $token)
    }
`;

export default function EmailValidation() {
    const params = useParams();
    const [error, setError] = React.useState(null);

    const navigate = useNavigate();

    const [check, { data, loading }] = useMutation(EMAIL_VALIDATION, {
        onError: (err) => {
            setError(err);
        }
    });

    React.useEffect(() => {
        check({ variables: { token: params.token } })
        // eslint-disable-next-line
    }, []);

    if (data) {
        navigate('/projects');
    }

    if (error) { 
        return (<p>{error?.message}</p>);
    }

    if (loading) { 
        return (<p>loading</p>);
    }
}