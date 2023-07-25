// Get DOM elements
const postsSection = document.querySelector("#existingposts");
const createPostSection = document.querySelector("#createNew");
const addPostBtn = document.querySelector("#addNewPost");
const newPost = document.querySelector("#newPost");
//const titleInput = document.querySelector("#title");
//const contentInput = document.querySelector("#content");

// Hide the "Create New Post" section initially
const hideCreateNewPost = () => {
    createNew.hidden = true;
};

hideCreateNewPost();

// Event listener for the "Add New Post" button
addNewPostButton.addEventListener("click", event => {
    event.preventDefault();
    console.log('click');
    existingPosts.hidden = true;
    addNewPostButton.hidden = true;
    createNew.style.hidden = false;
});

// Event listener for the "New Post" form submission
postForm.addEventListener("submit", async event => {
    event.preventDefault();
    // Get the values from the input fields
    const title = titleInput.value;
    const content = contentInput.value;
  
    // Check if both title and content are provided
    if (!title || !content) {
        alert("Please enter a title and some content");
        return;
    }

    // Create a new post object with the title and content
    const newPost = {
        title: title,
        content: content
    };

    console.log(newPost);

    try {
        // Send a POST request to the server to create a new post
        const response = await fetch("/api/posts", {
            method: "POST", 
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            // If the response is successful, hide the "Create New Post" section and reload the page
            createNew.setAttribute("hidden", "true");
            location.reload();
          } else {
            // If there's an error, show an alert
            alert("Error - please try again");
          }
        } catch (error) {
          // If an exception occurs during the fetch, show an alert with the error message
          alert("Error - " + error.message);
        }
});
