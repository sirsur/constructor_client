const setAdaptiveStyle = (display: string, element: string, styleName: string) => {
    const iframe = document.querySelector('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    let style = iframeDoc.querySelector('style');
    if (style === undefined || style === null) {
        style = iframeDoc.createElement('style');
        style.innerText = `@media (max-width: 600px) { .${element} { ${styleName}: ${display} !important; } }`;
    } else {
        let index = style.innerText.indexOf(`.${element}`);
        if (index === -1) {
            style.innerText = style.innerText.slice(0, style.innerText.length - 1);
            style.innerText = style.innerText + `.${element} { ${styleName}: ${display} !important; } }`;
        } else {
            const substr = `.${element} { `;
            const indexStyle = style.innerText.indexOf(styleName, index);
            const indexQuot = style.innerText.indexOf('}', index);
            if (indexStyle > indexQuot || indexStyle === -1) {
                index = style.innerText.indexOf(substr);
                const endIndex = index + substr.length;
                style.innerText = style.innerText.slice(0, endIndex) + `${styleName}: ${display} !important; ` + style.innerText.slice(endIndex);
            } else {
                const endIndexStyle = indexStyle + styleName.length;
                const indexSemicolon = style.innerText.indexOf(';', indexStyle);
                style.innerText = style.innerText.slice(0, endIndexStyle) + `: ${display} !important` + style.innerText.slice(indexSemicolon);
            }
        }
    }
    iframeDoc.head.appendChild(style);
}

export default setAdaptiveStyle;
