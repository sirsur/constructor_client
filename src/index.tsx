import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Registration from './pages/Registration';
import User from './pages/User';
import ProjectsList from './pages/ProjectsList';
import Project from './pages/Project';
import Refresh from './pages/Refresh';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import EmailValidation from './pages/EmailValidation';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';

const theme = createTheme({
    typography: {
        fontFamily: "Roboto"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    "p": {
                        margin: 0
                    }
                }
            }
        }
    }
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/registration",
        element: <Registration />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/userSettings",
        element: <User />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/projects",
        element: <ProjectsList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/project/:id",
        element: <Project />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/refresh",
        element: <Refresh />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/changePassword/:token",
        element: <ChangePassword />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/emailValidation/:token",
        element: <EmailValidation />,
        errorElement: <ErrorPage />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
            <CssBaseline />
        </ApolloProvider>
    </ThemeProvider>
);
