import React from "react";
import { ToSecondSectionContext } from '../../context';

const findElement = (element: string) => {
    const iframe = document.querySelector('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    let findElement = null;
    findElement = iframeDoc.querySelector(`.${element}`);
    return findElement;
}

const setTextSize = (size: string, element: string) => {
    const find = findElement(element);
    find.style.fontSize = `${size}rem`;
}

const setTextColor = (color: string, element: string) => {
    const find = findElement(element);
    find.style.color = color;
}

const setTextContent = (content: string, element: string) => {
    const find = findElement(element);
    find.textContent = content;
}

const setTextFont = (e: React.ChangeEvent<HTMLSelectElement>, element: string) => {
    const find = findElement(element);
    const font = e.target.value;
    
    const iframe = document.querySelector('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeHead = iframe.contentDocument.head;
    let fontLink = iframeDoc.querySelector('link');
    if (fontLink === undefined || fontLink === null) {
        fontLink = iframeDoc.createElement('link');
    }
    fontLink.href = `https://fonts.googleapis.com/css2?family=${font}:wght@100;400;700&display=swap`;
    fontLink.rel = 'stylesheet';
    iframeHead.appendChild(fontLink);

    fontLink.onload = () => {
        try {
            if (find) {
                find.style.fontFamily = font;
            } else {
                console.error('Header1 element not found in iframe body');
            }
        } catch (error) {
            console.error(error);
        }
    };
    fontLink.onerror = () => {
        console.error('Font file failed to load');
    };
}

const setTextWeight = (weight: string, element: string) => {
    const find = findElement(element);
    find.style.fontWeight = weight;
}

const setTextTransform = (transform: string, element: string) => {
    const find = findElement(element);
    find.style.textTransform = transform;
}

const Headers1Styles = () => {
    const { secondSectionElement, sessionStorageState } = React.useContext(ToSecondSectionContext);

    const [size, setSize] = React.useState('');
    const [color, setColor] = React.useState('');
    const [content, setContent] = React.useState('');
    React.useEffect(() => {
        if (sessionStorageState === true) {
            const find = findElement(secondSectionElement);
            if (find !== null && find !== undefined) {
                setContent(find.textContent);
            }
        }
        //eslint-disable-next-line
    }, [sessionStorageState])

    return (
        <>
            <div className='list'>
                <p className='itemList'>text content</p>
                <div className='styleButtons'>
                    <input value={ content } onChange={(e) => { setContent(e.target.value) }} />
                    <button className='addAndStyleButton' onClick={ () => setTextContent(content, secondSectionElement) }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>size of text</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setSize(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setTextSize(size, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>text weight</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setTextWeight('400', secondSectionElement) }>normal</button>
                    <button className='addAndStyleButton' onClick={ () => setTextWeight('700', secondSectionElement) }>bold</button>
                    <button className='addAndStyleButton' onClick={ () => setTextWeight('100', secondSectionElement) }>light</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>transform text</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setTextTransform('uppercase', secondSectionElement) }>uppercase</button>
                    <button className='addAndStyleButton' onClick={ () => setTextTransform('lowercase', secondSectionElement) }>lowercase</button>
                    <button className='addAndStyleButton' onClick={ () => setTextTransform('none', secondSectionElement) }>none</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>text color</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setColor(e.target.value) }} />
                    <button className='addAndStyleButton' onClick={ () => setTextColor(color, secondSectionElement)  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>text font</p>
                <div className='styleButtons'>
                    <select onChange={ (e) => { setTextFont(e, secondSectionElement); }}>
                        <option value=''>choose font</option>
                        <option value='Roboto'>Roboto</option>
                        <option value='Montserrat'>Montserrat</option>
                        <option value='PT Serif'>PT Serif</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Headers1Styles;