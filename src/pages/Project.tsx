import './../styles/project.css';
import FirstSectionProject from './components/FirstSectionProject';
import { IoPhonePortraitOutline, IoDesktopOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SecondSectionProject from './components/SecondSectionsProject';
import ThirdSectionProject from './components/ThirdSectionProject';
import FourthSectionProject from './components/FourthSectionProject';
import { ToSecondSectionContext } from '../context';
import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';



// make autosave every minute

// добавить проверку на аутентифкацию

// добавку страниц

// выкидывает после рефреша на список проектов, но нужно на проект

// менять время изменения проекта после сохранения внутри

// поменять минуты на 2 знака в дате создания и изменения

// change code of project and change code of component

const ISAUTH = gql`
    query IsAuth {
        isAuth
    }
`;

const GETPROJECTNAME = gql`
    query GetProjectName($id: String!) {
        getProjectName(id: $id)
    }
`;

const CHECKPROJECTFORUSER = gql`
    query CheckProjectForUser($id: String!) {
        checkProjectForUser(id: $id)
    }
`;

const SAVEPROJECTCODE = gql`
    mutation SaveProjectCode($input: saveProjectCode!) {
        saveProjectCode(input: $input)
    }
`;

const GETPROJECTCODEBYID = gql`
    query GetProjectCodeById($id: String!) {
        getProjectCodeById(id: $id)
    }
`;

const GETIMAGESFROMPROJECT = gql`
    query GetImagesFromProject($id: String!) {
        getImagesFromProject(id: $id) {
            images,
            imagesComponents
        }
    }
`;

const Projects = () => {
    const [secondSectionState, setSecondSectionState] = React.useState<boolean>(false);
    const toSecondSection = () => {
        setSecondSectionState(!secondSectionState);
        if (thirdSectionState === true) {
            setThirdSectionState(false);
        }
        if (fourthSectionState === true) {
            setFourthSectionState(false);
        }
    }

    const [thirdSectionState, setThirdSectionState] = React.useState<boolean>(false);
    const toThirdSection = () => {
        setThirdSectionState(!thirdSectionState);
        if (secondSectionState === true) {
            setSecondSectionState(false);
        }
        if (fourthSectionState === true) {
            setFourthSectionState(false);
        }
    }

    const [fourthSectionState, setFourthSectionState] = React.useState<boolean>(false);
    const toFourthSection = () => {
        setFourthSectionState(!fourthSectionState);
        if (secondSectionState === true) {
            setSecondSectionState(false);
        }
        if (thirdSectionState === true) {
            setThirdSectionState(false);
        }
    }

    const [firstSectionElement, setFirstSectionElement] = React.useState<string>('');
    const setElement = (element: string) => {
        setFirstSectionElement(element);
    }

    const [secondSectionElement, setSecondSectionElement] = React.useState<string>('');
    const setElementSecond = (element: string) => {
        setSecondSectionElement(element);
    }

    const [thirdState, setThirdState] = React.useState<number>(0);
    const setState = (section: number) => {
        if (section === 1) {
            setThirdState(1);
        } else if (section === 2) {
            setThirdState(2);
        } else if (section === 3) {
            setThirdState(3);
        } else if (section === 4) {
            setThirdState(4);
        } else if (section === 5) {
            setThirdState(5);
        }
    }

    interface Paragraph {
        element: string,
        className: string,
        block: string
    }
    const [paragraphsArray, setParagraphsArray] = React.useState<Paragraph[]>([]);
    const setParagraphsHook = (paragraph: Paragraph) => {
        setParagraphsArray(prevParagraph => [
            ...prevParagraph,
            paragraph
        ]);
    }
    const setParagraphsArrayHook = (array: Paragraph[]) => {
        setParagraphsArray(array);
    }

    interface Header1 {
        element: string,
        className: string,
        block: string
    }
    const [headers1Array, setHeaders1Array] = React.useState<Header1[]>([]);
    const setHeaders1Hook = (header1: Header1) => {
        setHeaders1Array(prevHeader => [
            ...prevHeader,
            header1
        ]);
    }
    const setHeaders1ArrayHook = (array: Header1[]) => {
        setHeaders1Array(array);
    }

    interface Link {
        element: string,
        className: string,
        block: string
    }
    const [linksArray, setLinksArray] = React.useState<Link[]>([]);
    const setLinksHook = (link: Link) => {
        setLinksArray(prevLink => [
            ...prevLink,
            link
        ]);
    }
    const setLinksArrayHook = (array: Paragraph[]) => {
        setLinksArray(array);
    }

    const [sectionsArray, setSectionsArray] = React.useState<string[]>([]);
    const setSectionsHook = (section: string) => {
        setSectionsArray(prevSection => [
            ...prevSection,
            section
        ]);
    }
    const setSectionsArrayHook = (array: string[]) => {
        setSectionsArray(array);
    }

    interface Div {
        elementParent: string,
        elementChildren: string[],
        className: string
    }

    const [blocksArray, setBlocksArray] = React.useState<Div[]>([]);
    const setBlocksHook = (block: Div) => {
        setBlocksArray(prevBlock => [
            ...prevBlock,
            block
        ]);
    }
    const setBlocksArrayHook = (array: Div[]) => {
        setBlocksArray(array);
    }


    const navigate = useNavigate();
    const { data: dataIsAuthData } = useQuery(ISAUTH);
    if (dataIsAuthData !== undefined) {
        if (dataIsAuthData['isAuth'] === false) {
            navigate('/refresh');
        }
    } else {
        navigate('/refresh');
    }

    const [error, setError] = React.useState(null);
    const params = useParams();
    const { data: getProjectNameData, loading: getProjectNameLoading } = useQuery(GETPROJECTNAME, {
        variables: { id: params.id  },
        onError: (err) => {
            setError(err);
        }
    });

    const { loading: checkProjectForUserLoading } = useQuery(CHECKPROJECTFORUSER, {
        variables: { id: params.id  },
        onError: (err) => {
            setError(err);
        }
    });

    const [saveProjectCode, { loading: saveProjectCodeLoading }] = useMutation(SAVEPROJECTCODE, {
        refetchQueries: [ { query: GETPROJECTCODEBYID, variables: { id: params.id } } ],
        onError: (err) => {
            setError(err.message);
        }
    });

    const getCode = () => {
        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const object = { code: iframeDoc.documentElement.outerHTML, id: params.id }

        saveProjectCode({ variables: { input: object } });
    }

    const { data: getProjectCodeByIdData, loading: getProjectCodeByIdLoading } = useQuery(GETPROJECTCODEBYID, {
        variables: { id: params.id  },
        onError: (err) => {
            setError(err);
        }
    });

    const [sessionStorageState, setSessionStorageState] = React.useState(false);
    const setHooksFromIframe = () => {
        const iframe = document.querySelector('iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const header = iframeDoc.querySelector('header');
        if (header) {
            sessionStorage.setItem('headerState', JSON.stringify(true));
        } else {
            sessionStorage.setItem('headerState', JSON.stringify(false));
        }

        const footer = iframeDoc.querySelector('footer');
        if (footer) {
            sessionStorage.setItem('footerState', JSON.stringify(true));
        } else {
            sessionStorage.setItem('footerState', JSON.stringify(false));
        }

        const sections = iframeDoc.querySelectorAll('[class*="Section"]');
        const classNames = [];
        for (let i = 0; i < sections.length; i++) {
            classNames.push(sections[i].classList[0]);
        }
        sessionStorage.setItem('sectionsArray', JSON.stringify(classNames));
        setSectionsArray(classNames);

        const paragraphs = iframeDoc.querySelectorAll('[class*="Paragraph"]');
        let elementsArray: string[] = [];
        for (let i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].parentElement.tagName.toLowerCase() === 'div') {
                if (paragraphs[i].parentElement.parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(paragraphs[i].parentElement.parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(paragraphs[i].parentElement.parentElement.classList[0]);
                }
            } else {
                if (paragraphs[i].parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(paragraphs[i].parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(paragraphs[i].parentElement.classList[0]);
                }
            }
        }
        let elementsArrayBlock: string[] = [];
        for (let i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].parentElement.classList[0] !== undefined) {
                elementsArrayBlock.push(paragraphs[i].parentElement.classList[0]);
            } else {
                elementsArrayBlock.push('');
            }
        }
        const paragraphsArray: Paragraph[] = [];
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphsArray.push({
                element: elementsArray[i],
                className: paragraphs[i].classList[0],
                block: elementsArrayBlock[i]
            });
        }
        sessionStorage.setItem('paragraphsArray', JSON.stringify(paragraphsArray));
        setParagraphsArray(paragraphsArray);

        const headers1 = iframeDoc.querySelectorAll('[class*="Header1"]');
        elementsArray = [];
        for (let i = 0; i < headers1.length; i++) {
            if (headers1[i].parentElement.tagName.toLowerCase() === 'div') {
                if (headers1[i].parentElement.parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(headers1[i].parentElement.parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(headers1[i].parentElement.parentElement.classList[0]);
                }
            } else {
                if (headers1[i].parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(headers1[i].parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(headers1[i].parentElement.classList[0]);
                }
            }
        }
        elementsArrayBlock = [];
        for (let i = 0; i < headers1.length; i++) {
            if (headers1[i].parentElement.classList[0] !== undefined) {
                elementsArrayBlock.push(headers1[i].parentElement.classList[0]);
            } else {
                elementsArrayBlock.push('');
            }
        }
        const headers1Array: Header1[] = [];
        for (let i = 0; i < headers1.length; i++) {
            headers1Array.push({
                element: elementsArray[i],
                className: headers1[i].classList[0],
                block: elementsArrayBlock[i]
            });
        }
        sessionStorage.setItem('headers1Array', JSON.stringify(headers1Array));
        setHeaders1Array(headers1Array);

        const links = iframeDoc.querySelectorAll('[class*="Link"]');
        elementsArray = [];
        for (let i = 0; i < links.length; i++) {
            if (links[i].parentElement.tagName.toLowerCase() === 'div') {
                if (links[i].parentElement.parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(links[i].parentElement.parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(links[i].parentElement.parentElement.classList[0]);
                }
            } else {
                if (links[i].parentElement.tagName.toLowerCase() !== 'section') {
                    elementsArray.push(links[i].parentElement.tagName.toLowerCase());
                } else {
                    elementsArray.push(links[i].parentElement.classList[0]);
                }
            }
        }
        elementsArrayBlock = [];
        for (let i = 0; i < links.length; i++) {
            if (links[i].parentElement.classList[0] !== undefined) {
                elementsArrayBlock.push(links[i].parentElement.classList[0]);
            } else {
                elementsArrayBlock.push('');
            }
        }
        const linksArray: Link[] = [];
        for (let i = 0; i < links.length; i++) {
            linksArray.push({
                element: elementsArray[i],
                className: links[i].classList[0],
                block: elementsArrayBlock[i]
            });
        }
        sessionStorage.setItem('linksArray', JSON.stringify(linksArray));
        setLinksArray(linksArray);

        const divs = iframeDoc.querySelectorAll('[class*="Div"]');
        const elementsParentsArray: string[] = [];
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].parentElement.tagName.toLowerCase() !== 'section') {
                elementsParentsArray.push(divs[i].parentElement.tagName.toLowerCase());
            } else {
                elementsParentsArray.push(divs[i].parentElement.classList[0]);
            }
        }
        const elementsChildrenArray: any[][] = [];
        for (let i = 0; i < divs.length; i++) {
            elementsChildrenArray[i] = [];
            for (let child of divs[i].children) {
                elementsChildrenArray[i].push(...child.classList);
            }        
        }
        const blocksArray: Div[] = [];
        for (let i = 0; i < divs.length; i++) {
            blocksArray.push({
                elementParent: elementsParentsArray[i],
                elementChildren: elementsChildrenArray[i],
                className: divs[i].classList[0]
            });
        }
        sessionStorage.setItem('blocksArray', JSON.stringify(blocksArray));
        setBlocksArray(blocksArray);

        setSessionStorageState(true);
    };

    const { data, loading: getImageLoading } = useQuery(GETIMAGESFROMPROJECT, {
        variables: { id: params.id  },
        onError: (err) => {
            setError(err);
        }
    })

    function b64toBlob(base64String) {
        const parts = base64String.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    React.useEffect(() => {
        const iframe = document.querySelector('iframe');
        if (data !== undefined && iframe !== null && iframe !== undefined && sessionStorageState === true) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            for (let i = 0; i < data.getImagesFromProject.images.length; i++) {
                let find = null;
                if (data.getImagesFromProject.imagesComponents[i] === 'header' || data.getImagesFromProject.imagesComponents[i] === 'footer') {
                    find = iframeDoc.querySelector(data.getImagesFromProject.imagesComponents[i]);
                } else {
                    find = iframeDoc.querySelector(`.${data.getImagesFromProject.imagesComponents[i]}`);
                }
                const blob = b64toBlob(`data:image/png;base64,${data.getImagesFromProject.images[i]}`);
                if (!data.getImagesFromProject.imagesComponents[i].includes('Image')) {
                    find.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
                    find.style.backgroundPosition = 'center';
                    find.style.backgroundSize = 'cover';
                    URL.revokeObjectURL(URL.createObjectURL(blob));
                }
            }
        }
    }, [data, sessionStorageState])

    const setMobileWidth = () => {
        const iframe = document.querySelector('iframe');
        iframe.style.width = '30%';
    }

    const setDesktopWidth = () => {
        const iframe = document.querySelector('iframe');
        iframe.style.width = '100%';
    }

    const [hide, setHide] = React.useState(true);
    const hideWorkSection = () => {
        const work = document.getElementById('workSection');
        work.style.width = '0%';
        const site = document.getElementById('siteSection');
        site.style.width = '100%';
    }
    const showWorkSection = () => {
        const work = document.getElementById('workSection');
        work.style.width = '30%';
        const site = document.getElementById('siteSection');
        site.style.width = '70%';
    }

    const [close, setClose] = React.useState(true);

    React.useEffect(() => {
        const iframe = document.querySelector('iframe');
        if (data !== undefined && iframe !== null && iframe !== undefined && sessionStorageState === true) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const links = iframeDoc.querySelectorAll('[class*="Link"]');
            const hrefs = [];

            const handleClick = (href, e) => {
                e.preventDefault();
                const hashIndex = href.indexOf('#');
                const hash = hashIndex !== -1 ? '#' + href.substring(hashIndex + 1) : '';
                iframeDoc.location.hash = hash;
            }

            for (let i = 0; i < links.length; i++) {
                const linkEl = links[i] as HTMLAnchorElement;
                hrefs.push(linkEl.href);
                links[i].addEventListener('click', handleClick.bind(null, linkEl.href));
            }
        }
    }, [data, sessionStorageState]);

    if (getProjectNameLoading || checkProjectForUserLoading || saveProjectCodeLoading || getProjectCodeByIdLoading || getImageLoading) { 
        return (<p>loading</p>);
    }

    if (error) { 
        console.log(error.message)
        navigate('/projects');
    }

    if (getProjectNameData !== undefined && getProjectCodeByIdData !== undefined) {
        if (getProjectCodeByIdData.getProjectCodeById !== null || getProjectCodeByIdData.getProjectCodeById) {
            var srcdoc = getProjectCodeByIdData.getProjectCodeById;
        } else {
            srcdoc = '<head><meta charset=utf-8></head><body style="margin: 0;"></body>';
        }
        const formattedHtml = prettier.format(srcdoc, {
            parser: 'html',
            plugins: [htmlParser],
        });        
        return (
            <div className='projectPage'>
                <header>
                    <div className='leftHeader'>
                        <Link to='/projects'><button>back</button></Link>
                        <button onClick={ () => getCode()}>save</button>
                        <button onClick={ () => setClose(false) }>code</button>
                        { hide && <button onClick={ () => { setHide(false); hideWorkSection() } }>hide</button>}
                        { !hide && <button onClick={ () => { setHide(true); showWorkSection() } }>show</button>}
                    </div>
                    <p>{ getProjectNameData.getProjectName }</p>
                    <div className='rightHeader'>
                        <button onClick={ () => setMobileWidth() }><IoPhonePortraitOutline size={19} /></button>
                        <button onClick={ () => setDesktopWidth() }><IoDesktopOutline size={19} /></button>
                    </div>
                </header>
                <section>
                    { !close &&
                        <div className='modal-overlay'>
                            <div className='modal'>
                                <button className='modal-close' onClick={ () => setClose(true)}>
                                    &times;
                                </button>
                                <SyntaxHighlighter language='jsx' style={ vs2015 }>
                                    {formattedHtml}
                                </SyntaxHighlighter>

                            </div>
                        </div>
                    }
                    <div id='workSection' className='workSection'>
                        <ToSecondSectionContext.Provider value={{ toSecondSection, setElement, firstSectionElement, sessionStorageState, paragraphsArray, setParagraphsHook, setParagraphsArrayHook, sectionsArray, setSectionsArrayHook, setSectionsHook, toThirdSection, setElementSecond, secondSectionElement, setState, thirdState, blocksArray, setBlocksHook, setBlocksArrayHook, toFourthSection, headers1Array, setHeaders1ArrayHook, setHeaders1Hook, linksArray, setLinksArrayHook, setLinksHook }}>
                            { (!secondSectionState && !thirdSectionState && !fourthSectionState) && <FirstSectionProject /> }
                            { (secondSectionState && !thirdSectionState && !fourthSectionState) && <SecondSectionProject /> }
                            { (!secondSectionState && thirdSectionState && !fourthSectionState) && <ThirdSectionProject /> }
                            { (!secondSectionState && !thirdSectionState && fourthSectionState) && <FourthSectionProject /> }
                        </ToSecondSectionContext.Provider>
                    </div>
                    <div className='siteSection' id='siteSection'>
                        <iframe id='iframe' title='site' onLoad={ () => setHooksFromIframe() } srcDoc={srcdoc} frameBorder={ 0 }>
                        </iframe>
                    </div>
                </section>
            </div>
        );
    }
}

export default Projects;
