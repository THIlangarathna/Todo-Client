import React, { useState } from 'react';
import TaskForm from './TaskForm'
import ConfirmationButton from './Confirmation';

const ContentBlock = ({ data, handleDragStart, handleDragOver, handleDrop, handleDragEnd, generateData, setArray }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleLinkClick = () => {
        setShowConfirmation(true);
    };

    return (
        <div id={data.id}
            draggable
            onDragStart={(e) => handleDragStart(e, data.id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, data.id)}
            onDragEnd={(e) => handleDragEnd(e, data.id, setArray, data)}
            className="list-item">
            <span><i class="bi bi-list mx-2"></i></span>
            <span className="pl-3">{data.title}</span>
            <a className="float-end" onClick={handleLinkClick}><i class="bi bi-trash-fill"></i></a>
            <a className="float-end mx-2" onClick={openPopup} href="#"><i className="bi bi-pencil-square"></i></a>
            {showConfirmation && <ConfirmationButton data={data} array={setArray}/>}
            <TaskForm isOpen={isPopupOpen} onClose={closePopup} generateData={generateData} data={data} />
        </div>
    );
};

export default ContentBlock;
