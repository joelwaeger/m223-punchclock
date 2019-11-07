const URL = 'http://localhost:8081';
let users = [];
var token = window.sessionStorage.getItem("token");


const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
};

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
const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderEntries();
        });
    });
    renderEntries();
};
/*
const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const renderEntries = () => {
    const display = document.querySelector('#userdispay');
    display.innerHTML = '';
    users.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    createEntryForm.addEventListener('submit', createUser);
    indexEntries();
});
*/