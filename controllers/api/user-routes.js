const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');

// Get all users with associated posts and comments
router.get('/', async (req, res) => {
    try {
        const dbUsers = await User.findAll({ include: [Post, Comment] });
        res.json(dbUsers);
    } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'An error occurred', err });
  }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('session-id')
        res.redirect('/');
    });
});

// Get a specific user by ID with associated posts and comments
router.get('/:id', async (req, res) => {
    try {
        const dbUser = await User.findByPk(req.params.id, { include: [Post, Comment] });
        res.json(dbUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body, { individualHooks: true });
        req.session.user = {
            id: newUser.id,
            username: newUser.username
        };
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'An error occurred', err });
    }
});
