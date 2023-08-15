import React, { useState } from 'react';
import { createItem, updateItem } from "../../helpers";

const TaskForm = ({ isOpen, onClose, generateData, data = null }) => {
    const [formData, setFormData] = useState(data ? data:[]);
    if (!isOpen) {
        return null;
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id == null) {
            createItem(formData);
        } else {
            updateItem(formData);
        }
        generateData();
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-content mt-4">
                <h3>{formData ? 'Edit Task':'Create New Task'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputField">Titile</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title" value={formData.title} onChange={handleInputChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textareaField">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter Description" value={formData.description} onChange={handleInputChange}>{formData.description}</textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropdownField">Priority</label>
                        <select className="form-control" id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required>
                            <option value={0}>High</option>
                            <option value={1}>Medium</option>
                            <option value={2}>Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dropdownField">Status</label>
                        <select className="form-control" id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                            <option value={0}>Todo</option>
                            <option value={1}>Doing</option>
                            <option value={2}>Done</option>
                        </select>
                    </div>
                    <br />
                    <button className="close-button btn btn-danger float-end" onClick={onClose}>Close</button>
                    <button type="submit" className="btn btn-primary float-end mx-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;