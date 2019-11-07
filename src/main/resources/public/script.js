const URL = 'http://localhost:8081';
let entries = [];
let users = [];
var token = window.sessionStorage.getItem("token");
const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    const category = {};
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
    renderEntries();
};

const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
            indexUsers();
        });
    });
};

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    createEntryForm.addEventListener('submit', createEntry);
    indexEntries();
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