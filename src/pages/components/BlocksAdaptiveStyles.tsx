import React from "react";
import { ToSecondSectionContext } from '../../context';
import setAdaptiveStyle from '../functions/setAdaptiveStyle';

const BlocksAdaptiveStyles = () => {
    const { secondSectionElement } = React.useContext(ToSecondSectionContext);

    const [marginTop, setMarginTop] = React.useState('');
    const [marginBottom, setMarginBottom] = React.useState('');
    const [marginLeft, setMarginLeft] = React.useState('');
    const [marginRight, setMarginRight] = React.useState('');

    return (
        <>
            <div className='list'>
                <p className='itemList'>display for block</p>
                <div className='styleButtons'>
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle('block', secondSectionElement, 'display') }>block</button>
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle('flex', secondSectionElement, 'display') }>flex</button>
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle('none', secondSectionElement, 'display') }>none</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin top</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginTop(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${marginTop}vh`, secondSectionElement, 'margin-top') }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin bottom</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginBottom(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${marginBottom}vh`, secondSectionElement, 'margin-bottom') }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin left</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginLeft(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${marginLeft}vw`, secondSectionElement, 'margin-left') }>submit</button>
                </div>
            </div>
            <div className='list'>
                <p className='itemList'>margin right</p>
                <div className='styleButtons'>
                    <input onChange={(e) => { setMarginRight(e.target.value) }} type='number' />
                    <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${marginRight}vw`, secondSectionElement, 'margin-right') }>submit</button>
                </div>
            </div>
        </>
    )
}

export default BlocksAdaptiveStyles;
