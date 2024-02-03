//TimeLinePartComponent.js

import {useEffect, useState} from 'react';
import "./timeLinePart.css";

const TimeLinePart = ({Id_part, onSelect, selectedTimeLineParts}) => {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if(selectedTimeLineParts[1] >= Id_part && selectedTimeLineParts[0] <= Id_part)
            setIsSelected(true);
        else
            setIsSelected(false); 
    }, [selectedTimeLineParts]);

    const handleSelect = (e) => {
        onSelect(Id_part, e.ctrlKey);
    }

    return (
        <div className={`timeLinePart ${(isSelected)&&"isSelected"}`} onClick={(e) => handleSelect(e)}>
            <h2>{Id_part * 10} - {Id_part * 10 + 10}</h2><br/>
        </div>
    );
};

export default TimeLinePart;