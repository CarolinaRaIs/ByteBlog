// Function to handle post update
function handleUpdate(event) {
    event.preventDefault();
    
    // Get the post ID from the hidden field
    const postId = document.querySelector("#hiddenPostId").value;
    
    // Get the edited post details from the input fields
    const editedTitle = document.querySelector("#editedTitle").value;
    const editedContent = document.querySelector("#editedContent").value;

    // Create an object with the edited post details
    const editPost = {
        title: editedTitle,
        content: editedContent,
    };

    console.log(editedTitle);
    console.log(editedContent);

    // Call the updatePost function with the post ID and editPost object
    updatePost(postId, editPost)
        .then((response) => {
            if (response.ok) {
                console.log("Post updated");
                redirectToDashboard();
            } else {
                showErrorMessage("Please try again");
            }
        })
        .catch((error) => {
            showErrorMessage("Error - " + error.message);
        });
}

// Function to send a PUT request to the server to update the post
async function updatePost(postId, editPost) {
    return fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(editPost),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

// Function to handle post deletion
function handleDelete(event) {
    event.preventDefault();
    
    // Get the post ID from the hidden field
    const postId = document.querySelector("#hiddenPostId").value;

    // Call the deletePost function with the post ID
    deletePost(postId)
        .then((response) => {
            if (response.ok) {
                console.log("Post deleted");
                redirectToDashboard();
            } else {
                showErrorMessage("Please try again");
            }
        })
        .catch((error) => {
            showErrorMessage("Error - " + error.message);
        });
}

// Function to send a DELETE request to the server to delete the post
async function deletePost(postId) {
    return fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });
}

// Function to redirect to the dashboard
function redirectToDashboard() {
    location.href = "/dashboard";
}

// Function to show error messages
function showErrorMessage(message) {
    alert(message);
}

// Add event listeners to the update and delete buttons
document.querySelector("#update").addEventListener("click", handleUpdate);
document.querySelector("#delete").addEventListener("click", handleDelete);
