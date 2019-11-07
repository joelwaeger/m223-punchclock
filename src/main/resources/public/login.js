const URL = 'http://localhost:8081';
let entries = [];
/*
const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};
*/
//Hides Password in URL
const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
        });
    });
    renderEntries();
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

const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    // const entry = {};
    // entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    // entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
};

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#loginForm');
    createEntryForm.addEventListener('submit', createEntry);
    indexEntries();
});

function getCredentials(userName, password){
    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"username": "${userName.value}","password": "${password.value}"}`
    }).then((result) => {
        if (result.status == 200) {
            let authHeader = result.headers.get("Authorization");
            window.sessionStorage.setItem("token", authHeader);
            window.location.href="http://localhost:8081/entries.html";
        } else {
            console.log("error");
            M.toast({html: 'Invalid Login'})
        }

    });
}

