import React from "react";

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

export const ToSecondSectionContext = React.createContext({
    toSecondSection: () => {},
    toThirdSection: () => {},
    toFourthSection: () => {},
    setElement: (element: string) => {},
    setElementSecond: (element: string) => {},
    firstSectionElement: '',
    secondSectionElement: '',
    sessionStorageState: false,
    paragraphsArray: [] as Paragraph[],
    setParagraphsHook: (paragraph: Paragraph) => {},
    setParagraphsArrayHook: (array: Paragraph[]) => {},
    headers1Array: [] as Header1[],
    setHeaders1Hook: (header1: Header1) => {},
    setHeaders1ArrayHook: (array: Header1[]) => {},
    linksArray: [] as Link[],
    setLinksHook: (link: Link) => {},
    setLinksArrayHook: (array: Link[]) => {},
    sectionsArray: [] as string[],
    setSectionsHook: (section: string) => {},
    setSectionsArrayHook: (array: string[]) => {},
    blocksArray: [] as Div[],
    setBlocksHook: (block: Div) => {},
    setBlocksArrayHook: (array: Div[]) => {},
    thirdState: 0,
    setState: (section: number) => {}
});
