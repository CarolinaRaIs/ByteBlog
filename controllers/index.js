// Import Express and create a router
const { Router } = require('express');
const router = Router();

// Import routes
// Double-check file paths
const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');
const commentRoutes = require('./api/comment-routes');
const homeRoutes = require('./home-routes');

// Define routes
router.use('/', homeRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes);

// Export the router
module.exports = router;