import React from "react";
import { IoArrowBack } from 'react-icons/io5';
import { ToSecondSectionContext } from '../../context';
import SectionsAdaptiveStyles from './SectionsAdaptiveStyles';
import ParagraphsAdaptiveStyles from './ParagraphsAdaptiveStyles';
import BlocksAdaptiveStyles from './BlocksAdaptiveStyles';
import Headers1AdaptiveStyles from './Headers1AdaptiveStyles';
import LinksAdaptiveStyles from './LinksAdaptiveStyles';

const FourthSectionProject = () => {
    const { toThirdSection, thirdState } = React.useContext(ToSecondSectionContext);

    return (
        <>
            <button className='backButton' onClick={ () => toThirdSection() }><IoArrowBack size={19} /></button>
            { (thirdState === 1) && <SectionsAdaptiveStyles /> }
            { (thirdState === 2) && <ParagraphsAdaptiveStyles /> }
            { (thirdState === 3) && <BlocksAdaptiveStyles /> }
            { (thirdState === 4) && <Headers1AdaptiveStyles /> }
            { (thirdState === 5) && <LinksAdaptiveStyles /> }
        </>
    )
}

export default FourthSectionProject;