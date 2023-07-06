import React from "react";
import { IoArrowBack } from 'react-icons/io5';
import { ToSecondSectionContext } from '../../context';
import SectionsStyles from './SectionsStyles';
import ParagraphsStyles from './ParagraphsStyles';
import BlocksStyles from './BlocksStyles';
import Headers1Styles from './Headers1Styles';
import LinksStyles from './LinksStyles';

const ThirdSectionProject = () => {
    const { toSecondSection, thirdState, toFourthSection } = React.useContext(ToSecondSectionContext);

    return (
        <>
            <button className='backButton' onClick={ () => toSecondSection() }><IoArrowBack size={19} /></button>
            <button className='addAndStyleButton' onClick={ () => toFourthSection() }>set mobile styles</button>
            { (thirdState === 1) && <SectionsStyles /> }
            { (thirdState === 2) && <ParagraphsStyles /> }
            { (thirdState === 3) && <BlocksStyles /> }
            { (thirdState === 4) && <Headers1Styles /> }
            { (thirdState === 5) && <LinksStyles /> }
        </>
    )
}

export default ThirdSectionProject;