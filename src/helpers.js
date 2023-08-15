import toastr from 'toastr';

export function createItem(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        };
        fetch('https://localhost:7001/api/ItemsAPI/', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    toastr.success('Task has been Created!');
                } else {
                    toastr.error(data.message);
                }
            })
            .catch((err) => {
                toastr.error(err.message);
            });
    } catch (error) {
        // Handle network error
        toastr.error(error.message);
    }
}

export function updateItem(data) {
    return new Promise((resolve, reject) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            };
            fetch('https://localhost:7001/api/ItemsAPI/' + data['id'], requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        toastr.success('Task has been Updated!');
                        resolve(true);
                    } else {
                        toastr.error(data.message);
                        resolve(false);
                    }
                })
                .catch((err) => {
                    toastr.error(err.message);
                    resolve(false);
                });
        } catch (error) {
            toastr.error(error.message);
            resolve(false);
        }

    });
}

export function deleteItem(id) {
    return new Promise((resolve, reject) => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            };
            fetch('https://localhost:7001/api/ItemsAPI/' + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        toastr.success('Task has been Deleted!');
                        resolve(true);
                    } else {
                        toastr.error(data.message);
                        resolve(false);
                    }
                })
                .catch((err) => {
                    toastr.error(err.message);
                    resolve(false);
                });
        } catch (error) {
            toastr.error(error.message);
            resolve(false);
        }
    });
}