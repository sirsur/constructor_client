import React from "react";
import { ToSecondSectionContext } from '../../context'
import { IoAdd, IoClose } from 'react-icons/io5';
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
    let findElement = null;
    findElement = iframeDoc.querySelector(`.${element}`);
    return findElement;
}

const findParent = (element: string) => {
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
    find.style.gap = `${gap}vw`;
}

const setDirection = (direction: string, element: string) => {
    const find = findElement(element);
    find.style.flexDirection = direction;
}

const setSelfAlign = (name: string, element: string) => {
    const find = findElement(element);

    switch(name) {
        case 'start':
            find.style.alignSelf = 'flex-start';
            break;
        case 'end':
            find.style.alignSelf = 'flex-end';
            break;
        case 'center':
            find.style.alignSelf = 'center';
            break;
    }
}

const setBlockMarginTop = (margin: string, element: string) => {
    const find = findElement(element);
    find.style.paddingTop = `${margin}vh`;
}

const setBlockMarginBottom = (margin: string, element: string) => {
    const find = findElement(element);
    find.style.paddingBottom = `${margin}vh`;
}

const setBlockMarginLeft = (margin: string, element: string) => {
    const find = findElement(element);
    find.style.paddingLeft = `${margin}vw`;
}

const setBlockMarginRight = (margin: string, element: string) => {
    const find = findElement(element);
    find.style.paddingRight = `${margin}vw`;
}

const BlocksStyles = () => {
    const { secondSectionElement, paragraphsArray, linksArray, headers1Array, blocksArray, setParagraphsArrayHook, setLinksArrayHook, setHeaders1ArrayHook, setBlocksArrayHook, sessionStorageState, firstSectionElement } = React.useContext(ToSecondSectionContext);

    React.useEffect(() => {
        if (paragraphsArray !== null) {
            sessionStorage.setItem('paragraphsArray', JSON.stringify(paragraphsArray));
        }
    }, [paragraphsArray])

    React.useEffect(() => {
        if (headers1Array !== null) {
            sessionStorage.setItem('headers1Array', JSON.stringify(headers1Array));
        }
    }, [headers1Array])

    React.useEffect(() => {
        if (linksArray !== null) {
            sessionStorage.setItem('linksArray', JSON.stringify(linksArray));
        }
    }, [linksArray])

    React.useEffect(() => {
        if (blocksArray !== null) {
            sessionStorage.setItem('blocksArray', JSON.stringify(blocksArray));
        }
    }, [blocksArray])

    interface Div {
        elementParent: string,
        elementChildren: string[],
        className: string
    }

    interface Header1 {
        element: string,
        className: string,
        block: string
    }
    
    interface Link {
        element: string,
        className: string,
        block: string
    }
    
    interface Paragraph {
        element: string,
        className: string,
        block: string
    }

    const addElementToBlock = (element: string, block: string) => {
        const iframe = document.querySelector('iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeElement = iframeDoc.querySelector(`.${element}`);
        const iframeBlock = iframeDoc.querySelector(`.${block}`);
        iframeBlock.appendChild(iframeElement);
    
        let paragraphs: Paragraph[] = paragraphsArray;
        paragraphs = paragraphs.map((paragraph) => {
            if (paragraph.className === element) { 
                return ({ element: paragraph.element, className: paragraph.className, block: block });
            }
            return paragraph; 
        });
        setParagraphsArrayHook(paragraphs);

        let headers1: Header1[] = headers1Array;
        headers1 = headers1.map((header) => {
            if (header.className === element) { 
                return ({ element: header.element, className: header.className, block: block });
            }
            return header; 
        });
        setHeaders1ArrayHook(headers1);

        let links: Link[] = linksArray;
        links = links.map((link) => {
            if (link.className === element) { 
                return ({ element: link.element, className: link.className, block: block });
            }
            return link; 
        });
        setLinksArrayHook(links);
        
        let divs: Div[] = blocksArray;
        divs = divs.map((div) => {
            if (div.className === block) {
                div.elementChildren.push(element);
            }
            return div; 
        });
        setBlocksArrayHook(divs);
    }

    const dropSectionBackgroundImage = (element: string) => {
        const find = findElement(element);
        find.style.background = 'none';
    }
    
    const deleteElementFromBlock = (parent: string, child: string, block: string) => {
        const find = findParent(parent);
        const iframe = document.querySelector('iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeElement = iframeDoc.querySelector(`.${child}`);
        console.log(iframeElement)
        console.log(child)
        find.appendChild(iframeElement);
    
        let paragraphs: Paragraph[] = paragraphsArray;
        paragraphs = paragraphs.map((paragraph) => {
            if (paragraph.className === child) { 
                return ({ element: paragraph.element, className: paragraph.className, block: '' });
            }
            return paragraph; 
        });
        setParagraphsArrayHook(paragraphs);

        let headers1: Header1[] = headers1Array;
        headers1 = headers1.map((header) => {
            if (header.className === child) { 
                return ({ element: header.element, className: header.className, block: '' });
            }
            return header; 
        });
        setHeaders1ArrayHook(headers1);

        let links: Link[] = linksArray;
        links = links.map((link) => {
            if (link.className === child) { 
                return ({ element: link.element, className: link.className, block: '' });
            }
            return link; 
        });
        setLinksArrayHook(links);

        let divs: Div[] = blocksArray;
        divs = divs.map((div) => {
            if (div.className === block) {
                const index = div.elementChildren.indexOf(child); 
                div.elementChildren.splice(index, 1);
                div.elementChildren.map((element) => {
                    return ({ element })
                })
            }
            return div; 
        });
        setBlocksArrayHook(divs);
    }

    React.useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('paragraphsArray')) !== null) {
            setParagraphsArrayHook(JSON.parse(sessionStorage.getItem('paragraphsArray')));
        }
        if (JSON.parse(sessionStorage.getItem('blocksArray')) !== null) {
            setBlocksArrayHook(JSON.parse(sessionStorage.getItem('blocksArray')));
        }
        if (JSON.parse(sessionStorage.getItem('headers1Array')) !== null) {
            setLinksArrayHook(JSON.parse(sessionStorage.getItem('headers1Array')));
        }
        if (JSON.parse(sessionStorage.getItem('linksArray')) !== null) {
            setHeaders1ArrayHook(JSON.parse(sessionStorage.getItem('linksArray')));
        }
        // eslint-disable-next-line
    }, [sessionStorageState])

    const [backgroundColor, setBackgroundColor] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [gap, setGap] = React.useState('');
    const [marginTop, setMarginTop] = React.useState('');
    const [marginBottom, setMarginBottom] = React.useState('');
    const [marginLeft, setMarginLeft] = React.useState('');
    const [marginRight, setMarginRight] = React.useState('');
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
                <p className='itemList'>pick elements for block</p>
                { linksArray?.map((linkName, index) => { 
                    if (linkName.block === '' && linkName.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {linkName.className}
                                <button onClick={ () => addElementToBlock(linkName.className, secondSectionElement) }><IoAdd size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
                { headers1Array?.map((header1Name, index) => { 
                    if (header1Name.block === '' && header1Name.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {header1Name.className}
                                <button onClick={ () => addElementToBlock(header1Name.className, secondSectionElement) }><IoAdd size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
                { paragraphsArray?.map((paragraphName, index) => { 
                    if (paragraphName.block === '' && paragraphName.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {paragraphName.className}
                                <button onClick={ () => addElementToBlock(paragraphName.className, secondSectionElement) }><IoAdd size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
            </div>
            <div className='list'>
                <p className='itemList'>elements in this block</p>
                { linksArray?.map((linkName, index) => { 
                    if (linkName.block === secondSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {linkName.className}
                                <button onClick={ () => deleteElementFromBlock(linkName.element, linkName.className, linkName.block) }><IoClose size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
                { headers1Array?.map((header1Name, index) => { 
                    if (header1Name.block === secondSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {header1Name.className}
                                <button onClick={ () => deleteElementFromBlock(header1Name.element, header1Name.className, header1Name.block) }><IoClose size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
                { paragraphsArray?.map((paragraphName, index) => { 
                    if (paragraphName.block === secondSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>
                                {paragraphName.className}
                                <button onClick={ () => deleteElementFromBlock(paragraphName.element, paragraphName.className, paragraphName.block) }><IoClose size={19} /></button>
                            </div> 
                        )
                    } else {
                        return null
                    }
                })}
            </div>
            <div className='list'>
                <p className='itemList'>horizontal text align for block</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('start', secondSectionElement) }>start</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('center', secondSectionElement) }>center</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignHorizontal('end', secondSectionElement) }>end</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>vertical text align for block</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('start', secondSectionElement) }>start</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('center', secondSectionElement) }>center</button>
                    <button className='addAndStyleButton' onClick={ () => setAlignVertical('end', secondSectionElement) }>end</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>self align along cross axis for block</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setSelfAlign('start', secondSectionElement) }>start</button>
                    <button className='addAndStyleButton' onClick={ () => setSelfAlign('center', secondSectionElement) }>center</button>
                    <button className='addAndStyleButton' onClick={ () => setSelfAlign('end', secondSectionElement) }>end</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>direction</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setDirection('column', secondSectionElement) }>column</button>
                    <button className='addAndStyleButton' onClick={ () => setDirection('row', secondSectionElement) }>row</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>gap</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setGap(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionGap(gap, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>height</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setHeight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setSectionHeight(height, secondSectionElement)  }>submit</button>
                </div>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setSectionHeight('auto', secondSectionElement)  }>auto</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin top</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginTop(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setBlockMarginTop(marginTop, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin bottom</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginBottom(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setBlockMarginBottom(marginBottom, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin left</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginLeft(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setBlockMarginLeft(marginLeft, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin right</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginRight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setBlockMarginRight(marginRight, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>background color</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setBackgroundColor(e.target.value) }} />
                    <button className='addAndStyleButton' onClick={ () => setSectionBackgroundColor(backgroundColor, secondSectionElement) }>submit</button>
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

export default BlocksStyles;