import { Box, Button, Dialog, Typography, TextField } from '@mui/material';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuComponent from './components/MenuComponent';
import { format } from 'date-fns';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';

const ISAUTH = gql`
    query IsAuth {
        isAuth
    }
`;

const CREATE_PROJECT = gql`
    mutation CreateProject($input: addProject!) {
        createProject(input: $input)
    }
`;

const DELETE_PROJECT = gql`
    mutation CreateProject($input: addProject!) {
        deleteProject(input: $input)
    }
`;

const GET_PROJECTS_BY_USER_ID = gql`
    query GetProjectsByUserId {
        getProjectsByUserId {
            projects {
                name, 
                dateCreate,
                dateUpdate,
                uuid
            }
        }
    }
`;

const CHANGE_PROJECT_INFO = gql`
    mutation ChangeProjectInfo($input: changeProjectInfo!) {
        changeProjectInfo(input: $input)
    }
`;

const GETPROJECTCODE = gql`
    query GetProjectCode($name: String!) {
        getProjectCode(name: $name)
    }
`;

export default function ProjectsList() {
    useEffect(() => {
        sessionStorage.clear();
    }, [])

    const [modalState, setModalState] = useState(false);

    const [modalProjectState, setModalProjectState] = useState(false);
    const [projectModal, setProjectModal] = useState({
        name: "",
        dateCreate: "",
        dateUpdate: "",
        uuid: ""
    });

    const [projectNameChanged, setProjectNameChanged] = useState({
        oldName: "",
        newName: ""
    });

    const [projectName, setProjectName] = useState({});

    const [projectNameDelete, setProjectNameDelete] = useState({});

    const navigate = useNavigate();

    const { data } = useQuery(ISAUTH);

    const [error, setError] = useState(null);

    const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
        onError: (err) => {
            setError(err.message);
        },
        onCompleted: () => {
            setError(null);
            setModalState(false);

        },
        refetchQueries: [
            {query: GET_PROJECTS_BY_USER_ID}
        ],
    });

    const [deleteProject, { loading: loadingDeleteProject }] = useMutation(DELETE_PROJECT, {
        onError: (err) => {
            setError(err.message);
        },
        onCompleted: () => {
            setError(null);
            setModalProjectState(false);

        },
        refetchQueries: [
            {query: GET_PROJECTS_BY_USER_ID}
        ],
    });

    const [changeProjectInfo, { loading: loadingChangeInfo }] = useMutation(CHANGE_PROJECT_INFO, {
        onError: (err) => {
            setError(err.message);
        },
        onCompleted: () => {
            setError(null);
            setProjectModal({...projectModal, name: projectNameChanged.newName, dateUpdate: format(new Date(), 'H:m:s dd MMM yyyy')});
        },
        refetchQueries: [
            {query: GET_PROJECTS_BY_USER_ID}
        ],
    });

    const { data: dataProjects } = useQuery(GET_PROJECTS_BY_USER_ID);

    const [modalCodeState, setModalCodeState] = useState(false);
    const [getProjectCode, { called, data: getProjectCodeData, loading: getProjectCodeLoading }] = useLazyQuery(GETPROJECTCODE, {
        onError: (err) => {
            setError(err.message);
        }
    });

    const [projectCode, setProjectCode] = React.useState('');
    React.useEffect(() => {
        if (getProjectCodeData !== undefined) {
            const code = getProjectCodeData.getProjectCode;
            const formattedCode = prettier.format(code, {
                parser: "html",
                plugins: [htmlParser],
            });
            setProjectCode(formattedCode);
        }
    }, [getProjectCodeData])

    if (loading || loadingChangeInfo || loadingDeleteProject || getProjectCodeLoading || (called && getProjectCodeData === undefined)) { 
        return (<p>loading</p>);
    }

    if (data !== undefined) {
        if (data['isAuth'] === false) {
            navigate('/refresh');
        }
    } else {
        navigate('/refresh');
    }

    // add pagination

    if (dataProjects !== undefined) {
        const projectsArray = dataProjects['getProjectsByUserId']['projects'];
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
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1vh',
                    px: '2vw',
                    py: '2vh'
                }}>
                    { projectsArray.map((project) => <Button sx={{ p: 0 }} onClick={() => { setModalProjectState(true); setProjectModal({...projectModal, name: project.name, dateCreate: project.dateCreate, dateUpdate: project.dateUpdate, uuid: project.uuid}); setProjectNameDelete({...projectNameDelete, name: project.name}); getProjectCode({ variables: { name: project.name } }); }}>{project.name}</Button>)}
                    <Dialog 
                        PaperProps={{ 
                            sx: { 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                px: '4vw',
                                py: '2vh',
                                gap: '1vh'
                            }
                        }}
                        open={ modalProjectState }
                        onClose={ () => setModalProjectState(false) }
                        aria-describedby="modal-modal-description"
                    >
                        <Typography id="modal-modal-description" sx={{ mb: 2 }}>
                            Change info about your project
                        </Typography>
                        <Box
                            component='form'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1vw'
                            }}
                            onSubmit={e => {
                                e.preventDefault();
                                changeProjectInfo({ variables: { input: projectNameChanged } });
                            }}
                        >
                            { error }
                            <TextField 
                                size='small'
                                defaultValue={projectModal.name} 
                                name='newName'
                                onChange={(e) => {
                                    setProjectNameChanged({
                                        ...projectNameChanged,
                                        [e.target.name]:e.target.value,
                                        oldName: projectModal.name
                                    });
                                }}
                            />
                            <TextField 
                                sx={{ display: 'none' }}
                                size='small'
                                defaultValue={projectModal.name} 
                                name='oldName'
                            />
                            <Box>{projectModal.dateCreate}</Box>
                            <Box>{projectModal.dateUpdate}</Box>
                            <Button variant='contained' color='primary' type='submit'>Confirm changes</Button>
                        </Box>
                        <Button onClick={ () => navigate(`/project/${projectModal.uuid}`) } variant='contained' color='primary' type='submit'>Change project code</Button>
                        <Button onClick={() => { setModalCodeState(true); }} variant='contained' color='primary'>Show project code</Button>
                        <Dialog 
                            PaperProps={{ sx: { 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                px: '2vw',
                                py: '2vh'
                            }}}
                            maxWidth = 'lg'
                            open={ modalCodeState }
                            onClose={ () => setModalCodeState(false) }
                            aria-describedby="modal-modal-description"
                        >
                            <SyntaxHighlighter language='jsx' style={ vs2015 }>
                                { projectCode }
                            </SyntaxHighlighter>
                        </Dialog>
                        <Box
                            component='form'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1vw'
                            }}
                            onSubmit={e => {
                                e.preventDefault();
                                deleteProject({ variables: { input: projectNameDelete } });
                            }}
                        >
                            <Button variant='contained' color='primary' type='submit'>Delete project</Button>
                        </Box>
                    </Dialog>
                </Box>
                <Button sx={{ p: 0 }} onClick={() => setModalState(true)}>+ Add new project</Button>
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
                        Input info about your project
                    </Typography>
                        <Box 
                            component='form'
                            sx={{ 
                                width: '80%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1vh'
                            }}
                            onSubmit={e => {
                                e.preventDefault();
                                createProject({ variables: { input: projectName } });
                            }}
                        >
                            { error }
                            <TextField 
                                label='Project name' 
                                name='name'
                                onChange={(e) => {
                                    setProjectName({
                                        ...projectName,
                                        [e.target.name]:e.target.value
                                    })
                                }}
                            />
                            <Button variant='contained' color='primary' type='submit'>Creact project</Button>
                        </Box>
                </Dialog>
            </Box>
        );
    }
}
