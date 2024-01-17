//TimeLinePartComponent.js

import React from 'react';
//import "./timeLinePart.css";

const TimeLinePart = ({Id_part, onSelect}) => {
    const handleSelect = (e) => {
        onSelect(Id_part, e.ctrlKey);
    }

    return (
        <div className="timeLinePart" onClick={(e) => handleSelect(e)}>
            <h2>{Id_part * 10} - {Id_part * 10 + 10}</h2><br/>
        </div>
    );
};

export default TimeLinePart;