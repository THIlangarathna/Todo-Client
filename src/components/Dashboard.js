import React, { useState, useEffect } from 'react';
import './../App.css';
import { Navigate } from "react-router-dom";
import ContentBlock from './item/ContentBlock';
import TaskForm from './item/TaskForm';
import { updateItem } from "./../helpers";
import toastr from 'toastr';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [toDoItems, setToDoItems] = useState([]);
    const [doingItems, setDoingItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    let dropzone;
    let initial = false;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                };
                fetch('https://localhost:7001/api/ItemsAPI', requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.isSuccess) {
                            setData(data.result);
                            if (!initial) {
                                divideData(data.result);
                                initial = true;
                                toastr.success('Tasks loaded Succesfully!');
                            }
                        } else {
                            toastr.error(data.message);
                        }
                    })
                    .catch((err) => {
                        toastr.error(err.message);
                    });
            } catch (error) {
                toastr.error(error.message);
            }
        }
    }, []);

    if (!localStorage.getItem('token')) {
        return <Navigate replace to="/login" />;
    }

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
        e.dataTransfer.setDragImage(e.target, 20, 20);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
    };

    const DragOver = (e, dropIndex) => {
        let mainSection = e.target.closest(".main-div");
        dropzone = mainSection.id;
    };

    const handleDragEnd = (e, index, setArray, dataItem) => {
        if (document.getElementById(dropzone).contains(document.getElementById(index))) {
            return;
        }
        if (dropzone == 'category-1') {
            dataItem['status'] = 0;
            updateItem(dataItem)
                .then(status => {
                    if (status) {
                        setToDoItems((prevItems) => [...prevItems, dataItem]);
                        setArray(prevItems => prevItems.filter(item => item !== dataItem));
                    }
                });
        } else if (dropzone == 'category-2') {
            dataItem['status'] = 1;
            updateItem(dataItem)
                .then(status => {
                    if (status) {
                        setDoingItems((prevItems) => [...prevItems, dataItem]);
                        setArray(prevItems => prevItems.filter(item => item !== dataItem));
                    }
                });
        } else {
            dataItem['status'] = 2;
            updateItem(dataItem)
                .then(status => {
                    if (status) {
                        setDoneItems((prevItems) => [...prevItems, dataItem]);
                        setArray(prevItems => prevItems.filter(item => item !== dataItem));
                    }
                });
        }
    }

    function divideData(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].status == 0) {
                if (!toDoItems.includes(data[i])) {
                    setToDoItems((prevItems) => [...prevItems, data[i]]);
                }
            } else if (data[i].status == 1) {
                if (!doingItems.includes(data[i])) {
                    setDoingItems((prevItems) => [...prevItems, data[i]]);
                }
            } else {
                if (!doneItems.includes(data[i])) {
                    setDoneItems((prevItems) => [...prevItems, data[i]]);
                }
            }
        }
    }

    const loadData = () => {
        setToDoItems([]);
        setDoingItems([]);
        setDoneItems([]);
        setTimeout(() => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                };
                fetch('https://localhost:7001/api/ItemsAPI', requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.isSuccess) {
                            setData(data.result);
                            if (!initial) {
                                divideData(data.result);
                                initial = false;
                            }
                        } else {
                            toastr.error(data.message);
                        }
                    })
                    .catch((err) => {
                        toastr.error(err.message);
                    });
            } catch (error) {
                toastr.error(error.message);
            }
        }, 200);
    };

    return (
        <div className="container pt-5">
            <button className='new-item float-end pr-2 btn btn-outline-primary' onClick={openPopup} href="#"><i class="bi bi-plus-circle-fill"></i> Create a New Task</button>
            <TaskForm isOpen={isPopupOpen} onClose={closePopup} generateData={loadData} />
            <br /><br />
            <div className="row">
                <div className="col-md-4">
                    <div className="main-div" id="category-1"
                        onDragOver={(e) => DragOver(e, data.id)}>
                        <h3 className='text-center pt-3'>To do</h3>
                        <div className="list-unstyled">
                            {toDoItems.map(function (item) {
                                return (
                                    <ContentBlock
                                        data={item}
                                        handleDragStart={handleDragStart}
                                        handleDragOver={handleDragOver}
                                        handleDrop={handleDrop}
                                        handleDragEnd={handleDragEnd}
                                        generateData={loadData}
                                        setArray={setToDoItems} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="main-div" id="category-2"
                        onDragOver={(e) => DragOver(e, data.id)}>
                        <h3 className='text-center pt-3'>Doing</h3>
                        <div className="list-unstyled">
                            {doingItems.map(function (item) {
                                return (
                                    <ContentBlock
                                        data={item}
                                        handleDragStart={handleDragStart}
                                        handleDragOver={handleDragOver}
                                        handleDrop={handleDrop}
                                        handleDragEnd={handleDragEnd}
                                        generateData={loadData}
                                        setArray={setDoingItems} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="main-div" id="category-3"
                        onDragOver={(e) => DragOver(e, data.id)}>
                        <h3 className='text-center pt-3'>Done</h3>
                        <div className="list-unstyled">
                            {doneItems.map(function (item) {
                                return (
                                    <ContentBlock
                                        data={item}
                                        handleDragStart={handleDragStart}
                                        handleDragOver={handleDragOver}
                                        handleDrop={handleDrop}
                                        handleDragEnd={handleDragEnd}
                                        generateData={loadData}
                                        setArray={setDoneItems} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
