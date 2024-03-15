let userName;

function flipForms() {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    registrationForm.classList.toggle('hidden');
    registrationForm.classList.toggle('visible');
    
    loginForm.classList.toggle('hidden');
    loginForm.classList.toggle('visible');
}


async function registerUser() {
    const username = document.getElementById('name').value;
    const usermail = document.getElementById('mail').value;
    const usercontact = document.getElementById('contact').value;
    const userpwd = document.getElementById('pwd').value;

    const newUser = {
        name: username,
        mail: usermail,
        contact: usercontact,
        pwd: userpwd
    }

    const data = JSON.stringify(newUser);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/register');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Signup Successful...', xhr.responseText);
            const responseJson = JSON.parse(xhr.responseText);
            alert('Account created successfully!');
            getUserName(responseJson.user.name);
        } 
        else if(xhr.status === 409){
            console.error('Conflict', xhr.status);
            alert('User with mail already exists. Use a different mail!');
        }
        else {
            console.error('Failed', xhr.status);
            alert('Error creating an account.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error creating an account.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}




async function loginUser() {
    const loginMail = document.getElementById('loginMail').value;
    const loginPwd = document.getElementById('loginPwd').value;

    const loginUser = {
        mail: loginMail,
        pwd: loginPwd
    }

    const data = JSON.stringify(loginUser);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/login');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Login Successful...', xhr.responseText);
            const responseJson = JSON.parse(xhr.responseText);
            alert('Account Login successful!');
            getUserName(responseJson.user.name);
        } 
        else if (xhr.status === 401) {
            console.error('Unauthorized', xhr.status);
            alert('Invalid credentials. Please try again.');
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error logging into account.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error logging into account.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }

}


function getUserName(name){
    userName = name;
    window.location.href = `index.html?name=${encodeURIComponent(userName)}`;
}


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name');
    const userNameDisplay = document.getElementById('displayUser');

    if (userNameDisplay && userName) {
        userNameDisplay.innerText = `${userName},`;
    }
});


function logout(){
    userName = null;
    alert('Logout Successful!');
    window.location.href = 'index.html';
}



async function bookAppointment() {
    const userName = document.getElementById('name').value;
    const useremail = document.getElementById('email').value;
    const selectedService = document.getElementById('service').value;
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    const newAppointment = {
        name: userName,
        email: useremail,
        service: selectedService,
        date: selectedDate,
        time: selectedTime
    };

    const data = JSON.stringify(newAppointment);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/book-appointment');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Appointment booked successfully...', xhr.responseText);
            alert('Appointment booked successfully!');
        } else if (xhr.status === 409) {
            console.error('Conflict', xhr.status);
            alert('Time slot not available. Please choose a different time.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error booking appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error booking appointment.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}



async function viewAppointment() {

    const userName = document.getElementById('name2').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/view-appointment/${userName}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const appointment = JSON.parse(xhr.responseText);
            const bookedDate = new Date(appointment.date).toLocaleDateString();
            alert(`Appointment booked at ${bookedDate} on ${appointment.time}`);
        } else if (xhr.status === 404) {
            console.error('Not Found', xhr.status);
            alert('No appointment found.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error viewing appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error viewing appointment.');
    };

    try {
        xhr.send();
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}



async function delAppointment() {
    const userName = document.getElementById('name2').value;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3000/delete-appointment/${userName}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Appointment deleted successfully!');
        } else if (xhr.status === 404) {
            console.error('Not Found', xhr.status);
            alert('No appointment found to delete.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error deleting appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error deleting appointment.');
    };

    try {
        xhr.send();
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}




