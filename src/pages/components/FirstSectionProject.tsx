import React from 'react';
import { IoArrowForward, IoTrashOutline } from 'react-icons/io5';
import { ToSecondSectionContext } from '../../context';
import { deleteElement } from '../functions/deleteElement';

const FirstSectionProject = () => {
    interface Paragraph {
        element: string,
        className: string,
        block: string
    }

    interface Div {
        elementParent: string,
        elementChildren: string[],
        className: string
    }

    const { toSecondSection, setElement, sessionStorageState, setParagraphsHook, paragraphsArray, setParagraphsArrayHook, sectionsArray, setSectionsArrayHook, setBlocksArrayHook, blocksArray } = React.useContext(ToSecondSectionContext);

    React.useEffect(() => {
        if (sectionsArray !== null) {
            sessionStorage.setItem('sectionsArray', JSON.stringify(sectionsArray));
        }
    }, [sectionsArray])

    const createSection = () => {
        const index = sectionsArray.length + 1;
        setSectionsArrayHook([
            ...sectionsArray,
            `Section${index}`
        ]);

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const iframeBody = iframeDoc.querySelector('body');

        const header = iframeDoc.querySelector('header');
        const footer = iframeDoc.querySelector('footer');
        const sectionBefore = iframeDoc.querySelector(`.Section${index-1}`);

        const iframeSection = iframeDoc.createElement('section');
        iframeSection.className = `Section${index}`;
        iframeSection.id = `Section${index}`;
        iframeSection.style.height = '100%';
        iframeSection.style.display = 'flex';
        iframeSection.style.flexDirection = 'column';

        const iframeP = iframeDoc.createElement('p');
        iframeP.style.margin = '0';
        iframeP.textContent = `Section`;
        const paragraphIndex = paragraphsArray.length + 1;
        iframeP.className = `Paragraph${paragraphIndex}`;
        setParagraphsHook({ element: `Section${index}`, className: `Paragraph${paragraphIndex}`, block: '' });

        if (header !== null) {
            if (index > 1 && sectionBefore != null) {
                header.parentNode.insertBefore(iframeSection, sectionBefore.nextSibling);
                iframeSection.appendChild(iframeP);
                return;
            }
            header.parentNode.insertBefore(iframeSection, header.nextSibling);
            iframeSection.appendChild(iframeP);
            return;
        }
        if (footer !== null) {
            footer.parentNode.insertBefore(iframeSection, footer);
            iframeSection.appendChild(iframeP);
            return;
        }
        iframeBody.appendChild(iframeSection);
        iframeSection.appendChild(iframeP);
    }

    const [headerState, setHeaderState] = React.useState(null);
    React.useEffect(() => {
        if (headerState !== null) {
            sessionStorage.setItem('headerState', JSON.stringify(headerState));
        }
    }, [headerState])

    const [footerState, setFooterState] = React.useState(null);
    React.useEffect(() => {
        if (footerState !== null) {
            sessionStorage.setItem('footerState', JSON.stringify(footerState));
        }    
    }, [footerState])

    const createHeader = () => {
        setHeaderState(true);

        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const iframeBody = iframeDoc.querySelector('body');

        const section1 = iframeDoc.querySelector('.Section1');

        const iframeHeader = iframeDoc.createElement('header');
        iframeHeader.style.height = '100%';
        iframeHeader.style.display = 'flex';
        iframeHeader.style.flexDirection = 'column';

        const iframeP = iframeDoc.createElement('p');
        iframeP.style.margin = '0';
        iframeP.textContent = 'Header';
        const paragraphIndex = paragraphsArray.length + 1;
        iframeP.className = `Paragraph${paragraphIndex}`;
        setParagraphsHook({ element: `header`, className: `Paragraph${paragraphIndex}`, block: '' });

        if (section1 !== null) {
            section1.parentNode.insertBefore(iframeHeader, section1);
            iframeHeader.appendChild(iframeP);
            return;
        }
        iframeBody.appendChild(iframeHeader);
        iframeHeader.appendChild(iframeP);
    }

    const createFooter = () => {
        setFooterState(true);
        
        const iframe = document.querySelector('iframe');

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const iframeBody = iframeDoc.querySelector('body');

        const iframeFooter = iframeDoc.createElement('footer');
        iframeFooter.style.height = '100%';
        iframeFooter.style.display = 'flex';
        iframeFooter.style.flexDirection = 'column';

        iframeBody.appendChild(iframeFooter);

        const iframeP = iframeDoc.createElement('p');
        iframeP.style.margin = '0';
        iframeP.textContent = 'Footer';
        const paragraphIndex = paragraphsArray.length + 1;
        iframeP.className = `Paragraph${paragraphIndex}`;
        setParagraphsHook({ element: `footer`, className: `Paragraph${paragraphIndex}`, block: '' });
        iframeFooter.appendChild(iframeP);
    }

    const deleteFromHookSection = (index: number) => {
        let sections = sectionsArray;
        sections.splice(index, 1);
        sections = sections.map((section, i) => {
            i++
            if (i >= 1) { 
                return `Section${i}`;
            }
            return section; 
        });
        deleteFromHookBlocks('Section', index+1);
        deleteFromHookParagraph('Section', index+1);
        setSectionsArrayHook(sections);
    }

    const deleteFromHookBlocks = (parent: string, sectionIndex = -1) => {
        let findIndex = [];
        let finalParent: string = '';
        if (sectionIndex.toString() === '-1') {
            finalParent = parent;
        } else {
            finalParent = `${parent}${sectionIndex}`;
        }
        findIndex = blocksArray.filter(element => element.elementParent === finalParent)
        let blocks: Div[] = blocksArray;
        if (sectionIndex.toString() === '-1') {
            blocks.splice(findIndex[0], 1);
        } else {
            for (let i = 0; i < findIndex.length; i++) {
                const index = blocks.indexOf(findIndex[i]);
                blocks.splice(index, 1);
                deleteElement(`.Div${index+1}`, (index+1).toString());
            }       
        }
        blocks = blocks.map((block, i) => {
            i++
            if (i >= 1) { 
                return ({ elementParent: block.elementParent, elementChildren: block.elementChildren,  className: `Div${i}` });
            }
            return block; 
        });
        setBlocksArrayHook(blocks);
    }

    const deleteFromHookParagraph = (parent: string, sectionIndex = -1) => {
        let findIndex = [];
        let finalParent: string = '';
        if (sectionIndex.toString() === '-1') {
            finalParent = parent;
        } else {
            finalParent = `${parent}${sectionIndex}`;
        }
        findIndex = paragraphsArray.filter(element => element.element === finalParent)
        let paragraphs: Paragraph[] = paragraphsArray;
        if (sectionIndex.toString() === '-1') {
            paragraphs.splice(findIndex[0], 1);
        } else {
            for (let i = 0; i < findIndex.length; i++) {
                const index = paragraphs.indexOf(findIndex[i]);
                paragraphs.splice(index, 1);
                deleteElement(`.Paragraph${index+1}`, (index+1).toString());
            }       
        }
        paragraphs = paragraphs.map((paragraph, i) => {
            i++
            if (i >= 1) { 
                return ({ element: paragraph.element, className: `Paragraph${i}`, block: paragraph.block });
            }
            return paragraph; 
        });
        setParagraphsArrayHook(paragraphs);
        deleteElement(`.Section${sectionIndex}`, (sectionIndex).toString());
    }

    React.useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('sectionsArray')) !== null) {
            setSectionsArrayHook(JSON.parse(sessionStorage.getItem('sectionsArray')));
        }
        setHeaderState(JSON.parse(sessionStorage.getItem('headerState')));
        setFooterState(JSON.parse(sessionStorage.getItem('footerState')));

        //eslint-disable-next-line
    }, [sessionStorageState])

    if (sessionStorageState === false) { 
        return (<p>loading</p>);
    }

    // скролл для списка компонентов нужен

    return (
        <>
            <div className='list'>
                { headerState && <div className='itemList'>Header<div><button onClick={ () => { toSecondSection(); setElement('header') }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteElement('header'); setHeaderState(false); deleteFromHookParagraph('Header') }}><IoTrashOutline size={19} /></button></div></div> }
                { !headerState && <button className='addAndStyleButton' onClick={ () => createHeader() }>+ add header</button> }
            </div>
            <div className='list'>
                { sectionsArray?.map((sectionName, index) => <div key={index+1} className='itemList'>{sectionName}<div><button onClick={ () => { toSecondSection(); setElement(sectionName) }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteFromHookSection(index); }}><IoTrashOutline size={19} /></button></div></div>) }
                <button className='addAndStyleButton' onClick={ () => createSection() }>+ add section</button>
            </div>
            <div className='list'>
                { footerState && <div className='itemList'>Footer<div><button onClick={ () => { toSecondSection(); setElement('footer') }}><IoArrowForward size={19} /></button><button onClick={ () => { deleteElement('footer'); setFooterState(false); deleteFromHookParagraph('Footer') }}><IoTrashOutline size={19} /></button></div></div> }
                { !footerState && <button className='addAndStyleButton' onClick={ () => createFooter() }>+ add footer</button> }
            </div>
        </>
    )
}

export default FirstSectionProject;