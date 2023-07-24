const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments with associated users and posts
router.get('/', async (req, res) => {
  try {
    // Retrieve all comments from the database, including their associated users and posts
    const dbComments = await Comment.findAll({ include: [User, Post] });
    
    // Send the retrieved comments as a JSON response
    res.json(dbComments);

  } catch (err) {
    // If an error occurs during the database query or response, handle the error
    console.log(err);
    res.status(500).json({ msg: 'An error occurred', err });
  }
});

// Get a specific comment by ID with associated user and post
router.get('/:id', async (req, res) => {
    try {
        // Find the comment with the given ID, including its associated user and post
        const dbComment = await Comment.findByPk(req.params.id, { include: [User, Post] });
        
        // Send the retrieved comment as a JSON response
        res.json(dbComment);

    } catch (err) {
      // If an error occurs during the database query or response, handle the error
      console.log(err);
      res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        // Extract the 'comment_text', 'user_id', and 'post_id' from the request body
        const { comment_text, post_id } = req.body;
  
        // Create a new comment in the database with the provided 'comment_text', 'user_id', and 'post_id'
        const newComment = await Comment.create({
            comment_text,
            user_id: req.session.user.id,
            post_id,
        }, 
        {
            include: [User, Post]
        });
  
        // Send the newly created comment as a JSON response
        res.json(newComment);

    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.log(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});
  
// Update a comment by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        // Update the comment with the provided ID in the database with the data from the request body
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
        }
      });
  
      // Send the updated comment as a JSON response
      res.json(updatedComment);

    } catch (err) {
      // If an error occurs during the database query or response, handle the error
      console.log(err);
      res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the comment with the provided ID from the database
        const delComment = await Comment.destroy({
            where: {
                id: req.params.id
        }
      });
  
        // Send the deleted comment as a JSON response
        res.json(delComment);
    
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.log(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});
  
module.exports = router;
  