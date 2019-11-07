const URL = 'http://localhost:8081';
let users = [];
var token = window.sessionStorage.getItem("token");

/*
const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};
const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    let category = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
    category['id'] = 1;
    entry['category'] = category;

    fetch(`${URL}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries.push(entry);
            renderEntries();
        });
    });
};
*/
fetch(`${URL}/index`, {
    method: 'GET',
    headers: {
        'Authorization': token
    },
    body: JSON.stringify(users)
}).then((result) => {
    result.json().then((user) => {
        users.push(user);
        indexUsers();
    });
});


const indexUsers = () => {
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderUsers();
        });
    });
};

const renderUsers = () => {
    const display = document.querySelector('#userDisplay');
    display.innerHTML = '';
    console.log(users);
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(user.username));
        row.appendChild(createCell(user.password));
        display.appendChild(row);
    });
};
