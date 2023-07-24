// Import the 'express' module, which is the web framework used to create the router
const express = require('express');
// Create a new router instance using the 'express.Router()' method
const router = express.Router();
// These models represent the database tables and allow me to interact with the database
const { User, Post, Comment } = require('../../models');
// This middleware is used to check if a user is authenticated before allowing access to certain routes
// It is used as a middleware in routes that require authentication
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        // Create a new post in the database with the provided 'title', 'content', and 'user_id' from the session
        const newPost = await Post.create({
            title,
            content,
            user_id: req.session.user.id,
        }, 
        {
            include: [User]
        });

        // Send the newly created post as a JSON response
        res.json(newPost);

    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.error(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        // Extract the 'title' and 'content' from the request body
        const { title, content } = req.body;
  
        // Update the post with the provided ID in the database with the data from the request body
        const updatedPost = await Post.update(
            { title, content },
            { where: { id: req.params.id }, include: [User] }
        );
    
    // Send the updated post as a JSON response
    res.json(updatedPost);
    
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.error(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        // Delete the post with the provided ID from the database
        const deletedPost = await Post.destroy({
            where: { id: req.params.id },
            include: [User],
        });
  
        // Send the deleted post as a JSON response
        res.json(deletedPost);
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.error(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
  });

// Get all posts and blogs associated with users and comments
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from the database, including their associated users and comments
        const dbPosts = await Post.findAll({ include: [User, Comment] });
  
        // Send the retrieved posts as a JSON response
        res.json(dbPosts);
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.error(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Get a single post and associated user and comment
router.get('/:id', async (req, res) => {
    try {
        // Find the post with the given ID, including its associated user and comments
        const dbPost = await Post.findByPk(req.params.id, { include: [User, Comment] });
  
        // Send the retrieved post as a JSON response
        res.json(dbPost);

    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.error(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

module.exports = router;


