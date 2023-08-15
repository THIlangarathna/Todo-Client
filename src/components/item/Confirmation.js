import React, { useState } from 'react';
import { deleteItem } from "../../helpers";

function ConfirmationButton({ data, array, status }) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isRejected, setRejected] = useState(false);

    const handleAccept = () => {
        setIsConfirmed(true);
        deleteItem(data['id'])
            .then(status => {
                if (status) {
                    array(prevItems => prevItems.filter(item => item !== data));
                }
            });
    };

    const handleReject = () => {
        setIsConfirmed(false);
        setRejected(true);
    };

    if(isRejected){
        return null;
    }

    return (
        <div>
            {isConfirmed ? (
                <p>Item deleted!</p>
            ) : (
                <div>
                    <p>Do you want to delete this task?</p>
                    <button className="btn btn-danger float-end" onClick={handleReject}>No</button>
                    <button className="btn btn-primary" onClick={handleAccept}>Yes</button>
                </div>
            )}
        </div>
    );
}

export default ConfirmationButton;
