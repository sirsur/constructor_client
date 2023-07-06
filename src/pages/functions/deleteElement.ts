export const deleteElement = (name: string, substr: string = '') => {
    const iframe = document.querySelector('iframe'); 
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const element = iframeDoc.querySelector(name);
    element.remove();
    if (substr === '') {
        return;
    }
    const othersName = name.replace(substr, '').replace('.', '');
    const others = Array.from(iframeDoc.querySelectorAll(`[class*="${othersName}"]`));
    if (others.length === 0) {
        return;
    }
    others.sort(function(a, b) {
        const regex = new RegExp(`${othersName}(\\d+)`);
        let aValue = parseInt((a as HTMLElement).className.match(regex)[1]);
        let bValue = parseInt((b as HTMLElement).className.match(regex)[1]);
        return aValue - bValue;
    });        
    others.forEach((el, index) => {
        el.classList.remove(`${othersName}${index + 2}`);
        el.classList.add(`${othersName}${index + 1}`);
    });
}
