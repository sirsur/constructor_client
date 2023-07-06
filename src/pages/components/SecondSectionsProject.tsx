import React from 'react';
import { IoArrowBack, IoArrowForward, IoTrashOutline } from 'react-icons/io5';
import { ToSecondSectionContext } from '../../context';
import { deleteElement } from '../functions/deleteElement';

interface Paragraph {
    element: string,
    className: string,
    block: string
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

interface Div {
    elementParent: string,
    elementChildren: string[],
    className: string
}

const SecondSectionProject = () => {
    const { toSecondSection, firstSectionElement, sessionStorageState, paragraphsArray, setParagraphsHook, setParagraphsArrayHook, toThirdSection, setElementSecond, setState, blocksArray, setBlocksHook, setBlocksArrayHook, linksArray, setLinksHook, setLinksArrayHook, headers1Array, setHeaders1Hook, setHeaders1ArrayHook } = React.useContext(ToSecondSectionContext);

    React.useEffect(() => {
        if (paragraphsArray !== null) {
            sessionStorage.setItem('paragraphsArray', JSON.stringify(paragraphsArray));
        }
    }, [paragraphsArray])

    React.useEffect(() => {
        if (linksArray !== null) {
            sessionStorage.setItem('linksArray', JSON.stringify(linksArray));
        }
    }, [linksArray])

    React.useEffect(() => {
        if (headers1Array !== null) {
            sessionStorage.setItem('headers1Array', JSON.stringify(headers1Array));
        }
    }, [headers1Array])

    React.useEffect(() => {
        if (blocksArray !== null) {
            sessionStorage.setItem('blocksArray', JSON.stringify(blocksArray));
        }
    }, [blocksArray])

    const createParagraph = (element: string) => {
        const index = paragraphsArray.length + 1;
        setParagraphsHook({ element: element, className: `Paragraph${index}`, block: '' });

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        let section = null;
        if (element === 'header' || element === 'footer') {
            section = iframeDoc.querySelector(element);
        } else {
            section = iframeDoc.querySelector(`.${element}`);
        }

        const iframeP = iframeDoc.createElement('p');
        iframeP.className = `Paragraph${index}`;
        iframeP.style.margin = '0';
        iframeP.textContent = `Paragraph`;

        section.appendChild(iframeP);
    }

    const deleteFromHookParagraph = (index: number) => {
        let paragraphs: Paragraph[] = paragraphsArray;
        paragraphs.splice(index, 1);
        paragraphs = paragraphs.map((paragraph, i) => {
            i++
            if (i >= 1) { 
                return ({ element: paragraph.element, className: `Paragraph${i}`, block: paragraph.block });
            }
            return paragraph; 
        });
        setParagraphsArrayHook(paragraphs);
    }

    const createHeader1 = (element: string) => {
        const index = headers1Array.length + 1;
        setHeaders1Hook({ element: element, className: `Header1_${index}`, block: '' });

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        let section = null;
        if (element === 'header' || element === 'footer') {
            section = iframeDoc.querySelector(element);
        } else {
            section = iframeDoc.querySelector(`.${element}`);
        }

        const iframeHeader1 = iframeDoc.createElement('h1');
        iframeHeader1.className = `Header1_${index}`;
        iframeHeader1.style.margin = '0';
        iframeHeader1.textContent = `Header1`;

        section.appendChild(iframeHeader1);
    }

    const deleteFromHookHeader1 = (index: number) => {
        let headers1: Header1[] = headers1Array;
        headers1.splice(index, 1);
        headers1 = headers1.map((header1, i) => {
            i++
            if (i >= 1) { 
                return ({ element: header1.element, className: `Header1_${i}`, block: header1.block });
            }
            return header1; 
        });
        setHeaders1ArrayHook(headers1);
    }

    const createHeader2 = () => {

    }

    const createLink = (element: string) => {
        const index = linksArray.length + 1;
        setLinksHook({ element: element, className: `Link${index}`, block: '' });

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        let section = null;
        if (element === 'header' || element === 'footer') {
            section = iframeDoc.querySelector(element);
        } else {
            section = iframeDoc.querySelector(`.${element}`);
        }

        const iframeLink = iframeDoc.createElement('a');
        iframeLink.className = `Link${index}`;
        iframeLink.style.margin = '0';
        iframeLink.textContent = `Link`;

        section.appendChild(iframeLink);
    }

    const deleteFromHookLink = (index: number) => {
        let links: Link[] = linksArray;
        links.splice(index, 1);
        links = links.map((link, i) => {
            i++
            if (i >= 1) { 
                return ({ element: link.element, className: `Link${i}`, block: link.block });
            }
            return link; 
        });
        setLinksArrayHook(links);
    }

    const createDiv = (element: string) => {
        const index = blocksArray.length + 1;
        setBlocksHook({ elementParent: element, elementChildren: [], className: `Div${index}` });

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        let section = null;
        if (element === 'header' || element === 'footer') {
            section = iframeDoc.querySelector(element);
        } else {
            section = iframeDoc.querySelector(`.${element}`);
        }

        const iframeDiv = iframeDoc.createElement('div');
        iframeDiv.className = `Div${index}`;
        iframeDiv.style.display = 'flex';

        section.appendChild(iframeDiv);
    }

    const deleteFromHookDiv = (index: number) => {
        let divs: Div[] = blocksArray;
        divs.splice(index, 1);
        divs = divs.map((div, i) => {
            i++
            if (i >= 1) { 
                return ({ elementParent: div.elementParent, elementChildren: div.elementChildren, className: `Div${i}` });
            }
            return div; 
        });
        deleteFromHookParagraphDiv('Div', index+1);
        deleteFromHookHeader1Div('Div', index+1);
        deleteFromHookLinkDiv('Div', index+1);
        setBlocksArrayHook(divs);
    }

    const deleteFromHookParagraphDiv = (parent: string, blockIndex: number) => {
        let findIndex = [];
        let finalParent: string = `${parent}${blockIndex}`;
        findIndex = paragraphsArray.filter((element) => {
            return element.block === finalParent;
        });

        let paragraphs: Paragraph[] = paragraphsArray;
        for (let i = 0; i < findIndex.length; i++) {
            const index = paragraphs.indexOf(findIndex[i]);
            paragraphs.splice(index, 1);
            deleteElement(`.Paragraph${index+1}`, (index+1).toString());
        }
        paragraphs = paragraphs.map((paragraph, i) => {
            i++
            if (i >= 1) { 
                return ({ element: paragraph.element, className: `Paragraph${i}`, block: paragraph.block });
            }
            return paragraph; 
        });
        setParagraphsArrayHook(paragraphs);
    }

    const deleteFromHookHeader1Div = (parent: string, blockIndex: number) => {
        let findIndex = [];
        let finalParent: string = `${parent}${blockIndex}`;
        findIndex = headers1Array.filter((element) => {
            return element.block === finalParent;
        });

        let headers1: Header1[] = headers1Array;
        for (let i = 0; i < findIndex.length; i++) {
            const index = headers1.indexOf(findIndex[i]);
            headers1.splice(index, 1);
            deleteElement(`.Header1_${index+1}`, (index+1).toString());
        }
        headers1 = headers1.map((header, i) => {
            i++
            if (i >= 1) { 
                return ({ element: header.element, className: `Header1_${i}`, block: header.block });
            }
            return header; 
        });
        setHeaders1ArrayHook(headers1Array)
    }

    const deleteFromHookLinkDiv = (parent: string, blockIndex: number) => {
        let findIndex = [];
        let finalParent: string = `${parent}${blockIndex}`;
        findIndex = linksArray.filter((element) => {
            return element.block === finalParent;
        });

        let links: Link[] = linksArray;
        for (let i = 0; i < findIndex.length; i++) {
            const index = links.indexOf(findIndex[i]);
            links.splice(index, 1);
            deleteElement(`.Link${index+1}`, (index+1).toString());
        }
        links = links.map((link, i) => {
            i++
            if (i >= 1) { 
                return ({ element: link.element, className: `Link${i}`, block: link.block });
            }
            return link; 
        });
        setLinksArrayHook(linksArray);
        deleteElement(`.Div${blockIndex}`, (blockIndex).toString());
    }

    React.useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('paragraphsArray')) !== null) {
            setParagraphsArrayHook(JSON.parse(sessionStorage.getItem('paragraphsArray')));
        }
        if (JSON.parse(sessionStorage.getItem('blocksArray')) !== null) {
            setBlocksArrayHook(JSON.parse(sessionStorage.getItem('blocksArray')));
        }
        if (JSON.parse(sessionStorage.getItem('headers1Array')) !== null) {
            setHeaders1ArrayHook(JSON.parse(sessionStorage.getItem('headers1Array')));
        }
        if (JSON.parse(sessionStorage.getItem('linksArray')) !== null) {
            setLinksArrayHook(JSON.parse(sessionStorage.getItem('linksArray')));
        }
        // eslint-disable-next-line
    }, [sessionStorageState])

    if (sessionStorageState === false) { 
        return (<p>loading</p>);
    }

    // заголовки
    // параграфы
    // таблицы
    // списки
    // картинки
    // ссылки
    // поля ввода и селекторы (формы с кнопкой сразу нужно создавать)

    return (
        <>
            <button className='backButton' onClick={ () => toSecondSection() }><IoArrowBack size={19}  /></button>
            <button className='addAndStyleButton' onClick={ () => { toThirdSection(); setState(1) }}>set style</button>
            <div className='list'>
                { headers1Array?.map((header1Name, index) => { 
                    if (header1Name.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>{header1Name.className}<div><button onClick={ () => { toThirdSection(); setElementSecond(header1Name.className); setState(4) }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteElement(`.Header1_${index+1}`, (index+1).toString()); deleteFromHookHeader1(index) }}><IoTrashOutline size={19} /></button></div></div> 
                        )
                    } else {
                        return null
                    }
                })}
                <button className='addAndStyleButton' onClick={ () => createHeader1(firstSectionElement) }>+ add header 1</button>
            </div>
            <div className='list'>
                <button className='addAndStyleButton' onClick={ () => createHeader2() }>+ add header 2</button>
            </div>
            <div className='list'>
                { linksArray?.map((linkName, index) => { 
                    if (linkName.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>{linkName.className}<div><button onClick={ () => { toThirdSection(); setElementSecond(linkName.className); setState(5) }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteElement(`.Link${index+1}`, (index+1).toString()); deleteFromHookLink(index) }}><IoTrashOutline size={19} /></button></div></div> 
                        )
                    } else {
                        return null
                    }
                })}
                <button className='addAndStyleButton' onClick={ () => createLink(firstSectionElement) }>+ add link</button>
            </div>
            <div className='list'>
                { paragraphsArray?.map((paragraphName, index) => { 
                    if (paragraphName.element === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>{paragraphName.className}<div><button onClick={ () => { toThirdSection(); setElementSecond(paragraphName.className); setState(2) }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteElement(`.Paragraph${index+1}`, (index+1).toString()); deleteFromHookParagraph(index) }}><IoTrashOutline size={19} /></button></div></div> 
                        )
                    } else {
                        return null
                    }
                })}
                <button className='addAndStyleButton' onClick={ () => createParagraph(firstSectionElement) }>+ add paragraph</button>
            </div>
            <div className='list'>
                { blocksArray?.map((divName, index) => { 
                    if (divName.elementParent === firstSectionElement) { 
                        return (
                            <div key={index+1} className='itemList'>{divName.className}
                                <div>
                                    <button onClick={ () => { toThirdSection(); setElementSecond(divName.className); setState(3) }}><IoArrowForward size={19} /></button>
                                    <button onClick={ () => { deleteFromHookDiv(index) }}><IoTrashOutline size={19} /></button>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                <button className='addAndStyleButton' onClick={ () => createDiv(firstSectionElement) }>+ add block of elements</button>
            </div>
        </>
    )
}

export default SecondSectionProject;