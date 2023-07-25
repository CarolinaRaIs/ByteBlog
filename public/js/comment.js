// Get form elements
const commentInput = document.querySelector("#comment");
const commentIdInput = document.querySelector("#CommentId");

document.querySelector("#newComment").addEventListener("submit", event => {
    //The default action of a form submit event is to send the form data to the URL specified in the form's action attribute and then refresh the page.
    //Handling the form submission with JS and sending form data using the Fetch API. 
    //Thats why don't want the page to refresh, it would interrupt the JS code (therefore not handle the form data.).
    event.preventDefault();
  
    // Destructure values from form elements
    const comment_text = commentInput.value;
    const post_id = commentIdInput.value;

    // Create new comment object
    const newComment = { comment_text, post_id };

    // Post new comment
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" }
    })

    // Post new comment
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" }
    })

    .then(response => {
        if (response.ok) {
            console.log("Comment posted:", newComment);
            location.reload();
        } else {
            alert("There was an error, please try again.");
        }
    })
    .catch(error => console.error('Error:', error));

});