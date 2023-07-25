// Function to handle the logout process
function signOut() {
    // Define an asynchronous function to perform the logout
    const logout = async () => {
      try {
        // Send a POST request to the server to log out the user
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        // If the response is successful (status code 200-299), redirect to the home page
        if (response.ok) {
            document.location.replace('/');
        } else {
            // If there's an error, show an error message
            alert('An error occurred while trying to log out. Please try again.');
        }
      } catch (error) {
        // If an exception occurs during the fetch, show an error message
        alert('An error occurred while trying to log out. Please try again.');
      }
    };
    
    // Get the logout button element from the DOM
    const logoutButton = document.querySelector('#logout');

    // Add a click event listener to the logout button that calls the logout function
    logoutButton.addEventListener('click', logout);
}
  
// Call the signOut function to set up the logout event listener
signOut();
  