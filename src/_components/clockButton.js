import React from 'react';

const ClockButton = props => {
    return <button className="clock-button" onClick={props.onClick}>{props.children}</button>
}

export {ClockButton};
