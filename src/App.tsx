import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export default function App() {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <Box component="img" src={process.env.PUBLIC_URL + './img/logo.svg'} alt='logo' 
                sx={{
                    height: '40px'
            }} />
            <h1>welcome</h1>
            <Box sx={{ 
                width: '33%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1vh'
            }}>
                <Button variant="contained" color="primary" component={RouterLink} to='/login'>Sign in</Button>
                <Button variant="contained" color="primary" component={RouterLink} to='/registration'>Sign up</Button>
            </Box>
        </Box>
    );
}
