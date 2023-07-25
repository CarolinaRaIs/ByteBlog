// Get the login form element from the DOM
const loginForm = document.querySelector('#loginform');

// Add a submit event listener to the login form that calls the handleLogin function
loginForm.addEventListener('submit', handleLogin);

// Function to handle the login form submission
function handleLogin(event) {
    event.preventDefault();

    // Get the input elements for username and password from the DOM
    const loginUsernameInput = document.querySelector('#loginusername');
    const loginPasswordInput = document.querySelector('#loginpassword');

    // Create an object containing the user's login credentials
    const userLogin = {
        username: loginUsernameInput.value,
        password: loginPasswordInput.value
    };

    // Call the loginUser function with the user's credentials and handle the response
    loginUser(userLogin)
        .then((response) => {
            // If the response is successful (status code 200-299), log a success message and redirect to the dashboard
            if (response.ok) {
                console.log("User is logged in");
                redirectToDashboard();
            } else {
                // If there's an error, show an error message
                showErrorMessage("Please try again");
            }
        })
        .catch((error) => {
            // If an exception occurs during the fetch, show an error message with the error details
            showErrorMessage("Error - " + error.message);
        });
}

// Function to send a login request to the server
async function loginUser(user) {
    return fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// Function to redirect to the dashboard page
function redirectToDashboard() {
    location.href = "/dashboard";
}

// Function to show an error message in an alert box
function showErrorMessage(message) {
    alert(message);
}
