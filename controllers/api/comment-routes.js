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

