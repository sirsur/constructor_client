import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const REFRESH_TOKEN = gql`
    query RefreshToken {
        refreshToken
    }
`;

export default function Refresh() {
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(REFRESH_TOKEN);

    if (data !== undefined) {
        if (data['refreshToken'] === true) {
            navigate('/projects');
        } else {
            navigate('/login');
        }
    }

    if (error) { 
        navigate('/login');
    }

    if (loading) { 
        return (<p>loading</p>);
    }
}
