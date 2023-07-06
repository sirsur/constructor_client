import React from "react";
import { ToSecondSectionContext } from '../../context';
import setAdaptiveStyle from '../functions/setAdaptiveStyle';

const SectionsAdaptiveStyles = () => {
    const { firstSectionElement } = React.useContext(ToSecondSectionContext);

    const [paddingTop, setPaddingTop] = React.useState('');
    const [paddingBottom, setPaddingBottom] = React.useState('');
    const [paddingLeft, setPaddingLeft] = React.useState('');
    const [paddingRight, setPaddingRight] = React.useState('');

    return (
        <>
            <div className='list'>
                <p className='itemList'>padding top</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingTop(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${paddingTop}vh`, firstSectionElement, 'padding-top')  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding bottom</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingBottom(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${paddingBottom}vh`, firstSectionElement, 'padding-bottom')  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding left</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingLeft(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${paddingLeft}vw`, firstSectionElement, 'padding-left')  }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>padding right</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setPaddingRight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${paddingRight}vw`, firstSectionElement, 'padding-right')  }>submit</button>
                </div>
            </div>
        </>
    )
}

export default SectionsAdaptiveStyles;
