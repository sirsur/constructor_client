import React from "react";
import { ToSecondSectionContext } from '../../context';
import setAdaptiveStyle from '../functions/setAdaptiveStyle';

const Headers1AdaptiveStyles = () => {
    const { secondSectionElement } = React.useContext(ToSecondSectionContext);

    const [size, setSize] = React.useState('');
    return (
        <div className='list'>
            <p className='itemList'>size of text</p>
            <div className='styleButtons'>
                <input onChange={(e) => { setSize(e.target.value) }} type='number' />
                <button className='addAndStyleButton' onClick={ () => setAdaptiveStyle(`${size}rem`, secondSectionElement, 'font-size') }>submit</button>
            </div>
        </div>
    )
}

export default Headers1AdaptiveStyles;
