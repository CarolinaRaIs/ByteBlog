const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Home page route
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts with associated users
    const posts = await Post.findAll({ include: [User] });
    const hbsPosts = posts.map(post => post.get({ plain: true }));

    // Check if the user is logged in
    const loggedIn = req.session.user ? true : false;

    // Render the 'home' template with the posts, loggedIn status, and username
    res.render('home', { posts: hbsPosts, loggedIn, username: req.session.user?.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login page route
router.get('/login', (req, res) => {
    // Check if the user is logged in
    const loggedIn = req.session.user ? true : false;
    // Render the 'login' template with the loggedIn status
    res.render('login', { loggedIn });
});
  
// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.clearCookie('session-id');
      res.redirect('/');
    });
});

// Signup page route
router.get('/signup', (req, res) => {
  // Render the 'signup' template
  res.render('signup');
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
    try {
      // Check if the user is logged in
      if (!req.session.user) {
        res.redirect('/login');
        return;
      }

      // Retrieve the user's data including posts and comments
      const userData = await User.findByPk(req.session.user.id, {
        include: [
          {
            model: Post,
            include: [Comment, User]
          }
        ]
      });

      // Convert the data to plain objects
      const hbsData = userData.get({ plain: true });
      hbsData.loggedIn = req.session.user ? true : false;

      // Render the 'dashboard' template with the user's data
      res.render('dashboard', hbsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Single post route
router.get('/posts/:id', async (req, res) => {
    try {
      // Check if the user is logged in
      if (!req.session.user) {
        return res.redirect('/login');
      }

      // Retrieve the single post with associated user and comments
      const dbPost = await Post.findByPk(req.params.id, {
        include: [
          User,
          {
            model: Comment,
            include: [User]
          }
        ]
      });

      // Convert the post data to a plain object
      const hbsPost = dbPost.get({ plain: true });
      const loggedIn = req.session.user ? true : false;

      // Check if the post belongs to the logged-in user
      if (hbsPost.userId !== req.session.user.id) {
        // Render the 'comment' template if it's not the user's post
        return res.render('comment', { hbsPost, loggedIn, username: req.session.user?.username });
      }

      // Render the 'updateDelete' template if it's the user's post
      res.render('updateDelete', { hbsPost, loggedIn, username: req.session.user?.username });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Default catch-all route
router.get('*', (req, res) => {
  res.redirect('/');
});
  
module.exports = router;