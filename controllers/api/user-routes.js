const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const Post = require('../../models/Post')
const Comment  = require('../../models/Comment')
console.log(User); // Add this line to check if User is imported correctly
const bcrypt = require('bcrypt');

// Get all users with associated posts and comments
router.get('/', async (req, res) => {
    try {
        // Retrieve all users from the database, including their associated posts and comments
        const dbUsers = await User.findAll({ include: [Post, Comment] });
        // Send the retrieved users as a JSON response
        res.json(dbUsers);
    } catch (err) {
    // If an error occurs during the database query or response, handle the error
    console.log(err);
    res.status(500).json({ msg: 'An error occurred', err });
  }
});

// Logout route
router.get('/logout', (req, res) => {
    // Destroy the user session to log them out
    req.session.destroy(err => {
        if (err) {
            // Destroy the user session to log them out
            console.log(err);
            return res.status(500).json({ message: 'Failed to log out' });
        }
        // Clear the session ID cookie and redirect to the home page
        res.clearCookie('session-id')
        res.redirect('/');
    });
});

// Get a specific user by ID with associated posts and comments
router.get('/:id', async (req, res) => {
    try {
        // Find the user with the given ID, including their associated posts and comments
        const dbUser = await User.findByPk(req.params.id, { include: [Post, Comment] });
        // Send the retrieved user as a JSON response
        res.json(dbUser);
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.log(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user in the database with the provided data
        // hash the password using hooks
        const newUser = await User.create(req.body, { individualHooks: true });
        // Create a new user session with the user ID and username
        req.session.user = {
            id: newUser.id,
            username: newUser.username
        };
        // Send the newly created user as a JSON response
        res.json(newUser);
    } catch (err) {
        // If an error occurs during the database query or response, handle the error
        console.log('Error creating user:', err);
        // Send the error message in the response
        res.status(500).json({ msg: 'An error occurred', err: err.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
      // Find the user with the provided username in the database
      const foundUser = await User.findOne({
        where: {
          username: req.body.username
        }
      });

      if (!foundUser) {
        // If no user is found with the provided username, return an error response
        return res.status(400).json({ msg: 'Wrong login credentials' });
      }

      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // If the provided password matches the stored hashed password, create a new user session
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username
        };
        // Send the found user as a JSON response
        return res.json(foundUser);

      } else {
        // If the provided password does not match, return an error response
        return res.status(400).json({ msg: 'Wrong login credentials' });
      }
    } catch (err) {
    // If an error occurs during the database query or response, handle the error
    console.log(err);
    res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        // Update the user with the provided ID in the database with the data from the request body
        const updatedUser = await User.update(req.body, {
            where: {
                id: req.params.id
            },
        individualHooks: true

        });
        // Send the updated user as a JSON response
        res.json(updatedUser);
    } catch (err) {
      // If an error occurs during the database query or response, handle the error
      console.log(err);
      res.status(500).json({ msg: 'An error occurred', err });
    }
  });
  
  // Delete a user by ID
  router.delete('/:id', async (req, res) => {
    try {
      const delUser = await User.destroy({
        where: {
          id: req.params.id
        }
      });
      res.json(delUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'An error occurred', err });
    }
  });
  
  module.exports = router;