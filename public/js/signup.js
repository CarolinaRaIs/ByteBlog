// Function to handle user signup
function handleSignup(event) {
    event.preventDefault();
    
    // Get the input values from the signup form
    const signupUsernameInput = document.querySelector("#signupUsername");
    const signupPasswordInput = document.querySelector("#signupPassword");

    // Create a user object with the username and password
    const userObj = {
        username: signupUsernameInput.value,
        password: signupPasswordInput.value,
    };

    // Call the signupUser function with the user object
    signupUser(userObj)
        .then((response) => {
            if (response.ok) {
                console.log("User is signed up");
                redirectToDashboard();
            } else {
                showErrorMessage("Please try again");
            }
        })
        .catch((error) => {
            showErrorMessage("Error - " + error.message);
        });
}

// Function to send a POST request to the server to sign up the user
async function signupUser(user) {
    return fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

// Function to redirect to the dashboard after successful signup
function redirectToDashboard() {
    location.href = "/dashboard";
}

// Function to show error messages
function showErrorMessage(message) {
    alert(message);
}

// Add event listener to the signup form
document.querySelector("#signupform").addEventListener("submit", handleSignup);
