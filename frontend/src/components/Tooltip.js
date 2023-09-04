import React from 'react';
import '../styles/Tooltip.css';

function Tooltip(props) {
  return (
    <div className="tooltip">
        {props.children}
        <span className="tooltiptext">{props.text}</span>
    </div> 
  )
}

export default Tooltip