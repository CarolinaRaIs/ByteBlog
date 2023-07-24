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
        // Extract the 'title' and 'content' from the request body
        const { title, content } = req.body;

        // Create a new post in the database with the provided 'title', 'content', and 'user_id' from the session
        const newPost = await Post.create({
            title,
            content,
            user_id: req.session.user.id,
        });

        // Send the newly created post as a JSON response
        res.json(newPost);

        } catch (err) {
            // If an error occurs during the database query or response, handle the error
            console.error(err);
            res.status(500).json({ msg: 'An error occurred', err });
        }
    });
