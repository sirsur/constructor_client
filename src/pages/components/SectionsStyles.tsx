import React from "react";
import { ToSecondSectionContext } from '../../context';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

const SETIMAGETOPROJECT = gql`
    mutation SetImageToProject($input: setImage!) {
        setImageToProject(input: $input)
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

const findElement = (element: string) => {
    const iframe = document.querySelector('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    let section = null;
    if (element === 'header' || element === 'footer') {
        section = iframeDoc.querySelector(element);
    } else {
        section = iframeDoc.querySelector(`.${element}`);
    }
    return section;
}

const setAlignHorizontal = (name: string, element: string) => {
    const find = findElement(element);

    if (find.style.flexDirection === 'column') {
        switch(name) {
            case 'start':
                find.style.alignItems = 'flex-start';
                break;
            case 'end':
                find.style.alignItems = 'flex-end';
                break;
            case 'center':
                find.style.alignItems = 'center';
                break;
        }
    } else {
        switch(name) {
            case 'start':
                find.style.justifyContent = 'flex-start';
                break;
            case 'end':
                find.style.justifyContent = 'flex-end';
                break;
            case 'center':
                find.style.justifyContent = 'center';
                break;
        }
    }
}

const setAlignVertical = (name: string, element: string) => {
    const find = findElement(element);

    if (find.style.flexDirection === 'column') {
        switch(name) {
            case 'start':
                find.style.justifyContent = 'flex-start';
                break;
            case 'end':
                find.style.justifyContent = 'flex-end';
                break;
            case 'center':
                find.style.justifyContent = 'center';
                break;
        }
    } else {
        switch(name) {
            case 'start':
                find.style.alignItems = 'flex-start';
                break;
            case 'end':
                find.style.alignItems = 'flex-end';
                break;
            case 'center':
                find.style.alignItems = 'center';
                break;
        }
    }
}

const setSectionBackgroundColor = (color: string, element: string) => {
    const find = findElement(element);
    find.style.backgroundColor = color;
}

const setSectionHeight = (height: string, element: string) => {
    const find = findElement(element);

    if (height === 'auto') {
        find.style.height = '100%';
        return;
    }

    find.style.height = `${height}vh`;
}

const setSectionGap = (gap: string, element: string) => {
    const find = findElement(element);
    find.style.gap = `${gap}vh`;
}

const setDirection = (direction: string, element: string) => {
    const find = findElement(element);
    find.style.flexDirection = direction;
}

const setSectionPaddingTop = (padding: string, element: string) => {
    const find = findElement(element);
    find.style.paddingTop = `${padding}vh`;
}

const setSectionPaddingBottom = (padding: string, element: string) => {
    const find = findElement(element);
    find.style.paddingBottom = `${padding}vh`;
}

const setSectionPaddingLeft = (padding: string, element: string) => {
    const find = findElement(element);
    find.style.paddingLeft = `${padding}vw`;
}

const setSectionPaddingRight = (padding: string, element: string) => {
    const find = findElement(element);
    find.style.paddingRight = `${padding}vw`;
}

const dropSectionBackgroundImage = (element: string) => {
    const find = findElement(element);
    find.style.background = 'none';
}

const SectionsStyles = () => {
    const { firstSectionElement, sessionStorageState } = React.useContext(ToSecondSectionContext);

    const [backgroundColor, setBackgroundColor] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [gap, setGap] = React.useState('');
    const [paddingTop, setPaddingTop] = React.useState('');
    const [paddingBottom, setPaddingBottom] = React.useState('');
    const [paddingLeft, setPaddingLeft] = React.useState('');
    const [paddingRight, setPaddingRight] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(false);

    const [error, setError] = React.useState(null);
    const params = useParams();
    const [setImageToProject, { loading: setImageLoading }] = useMutation(SETIMAGETOPROJECT, {
        onError: (err) => {
            setError(err.message);
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
    const setSectionBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const find = findElement(firstSectionElement);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            const base64WithoutHeader = base64.split(",")[1];
            const object = { image: base64WithoutHeader, id: params.id, imageComponent: firstSectionElement }
            setImageToProject({ variables: { input: object } })
            const blob = b64toBlob(base64);
            find.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
            find.style.backgroundPosition = 'center';
            find.style.backgroundSize = 'cover';
            URL.revokeObjectURL(URL.createObjectURL(blob));
        };
        reader.readAsDataURL(file);
    }

    const { data, loading: getImageLoading } = useQuery(GETIMAGESFROMPROJECT, {
        variables: { id: params.id  },
        onError: (err) => {
            setError(err);
        }
    })

    React.useEffect(() => {
        if (data !== undefined && sessionStorageState === true) {
            for (let i = 0; i < data.getImagesFromProject.images.length; i++) {
                const blob = b64toBlob(`data:image/png;base64,${data.getImagesFromProject.images[i]}`);
                if (data.getImagesFromProject.imagesComponents[i] === 'header') {
                    setIsDisabled(true);
                    document.getElementById('input').setAttribute('value', URL.createObjectURL(blob));
                }
            }
        }
    }, [data, sessionStorageState])

    if (error) { 
        console.log(error.message)
    }

    if (getImageLoading || setImageLoading) { 
        return (<p>loading</p>);
    }

    return (
        <>
            <div className='list'>
                <p className='itemList'>horizontal text align for section</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('start', firstSectionElement) }>start</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('center', firstSectionElement) }>center</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('end', firstSectionElement) }>end</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>vertical text align for section</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('start', firstSectionElement) }>start</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('center', firstSectionElement) }>center</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('end', firstSectionElement) }>end</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding top</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingTop(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionPaddingTop(paddingTop, firstSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding bottom</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingBottom(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionPaddingBottom(paddingBottom, firstSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding left</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingLeft(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionPaddingLeft(paddingLeft, firstSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding right</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingRight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionPaddingRight(paddingRight, firstSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>gap</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setGap(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionGap(gap, firstSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>direction</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setDirection('column', firstSectionElement) }>column</button>
                    <button className='addAndStyleButton' onClick={ () => setDirection('row', firstSectionElement) }>row</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>height</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setHeight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionHeight(height, firstSectionElement)  }>submit</button>
                </div>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setSectionHeight('auto', firstSectionElement)  }>auto</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>background color</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setBackgroundColor(e.target.value) }} />
                    <button className='addAndStyleButton' onClick={ () => setSectionBackgroundColor(backgroundColor, firstSectionElement) }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>download image for background</p>
                <div className='styleButtons'>
                    <label>
                        <input id='input' onChange={(e) => { setSectionBackgroundImage(e); setIsDisabled(true); }} type='file' disabled={ isDisabled } />
                        { !isDisabled ? <p style={{cursor: 'pointer'}}>choose file</p> : <p>you have already select file</p> }
                    </label>
                    <br />
                    <button className='addAndStyleButton' onClick={ () => { dropSectionBackgroundImage(firstSectionElement); setIsDisabled(false); }}>drop background image</button>
                </div>
            </div>
        </>
    )
}

export default SectionsStyles;