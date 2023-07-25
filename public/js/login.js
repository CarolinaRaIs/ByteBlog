const loginForm = document.querySelector('#loginform');

loginForm.addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();
    
    const loginUsernameInput = document.querySelector('#loginusername');
    const loginPasswordInput = document.querySelector('#loginpassword');

    const userLogin = {
        username: loginUsernameInput.value,
        password: loginPasswordInput.value
    };

    loginUser(userLogin)
        .then((response) => {
            if (response.ok) {
                console.log("User is logged in");
                redirectToDashboard();
            } else {
                showErrorMessage("Please try again");
            }
        })
        .catch((error) => {
            showErrorMessage("Error - " + error.message);
        });
}

async function loginUser(user) {
    return fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function redirectToDashboard() {
    location.href = "/dashboard";
}

function showErrorMessage(message) {
    alert(message);
}
