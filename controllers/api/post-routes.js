// Import the 'express' module, which is the web framework used to create the router
const express = require('express');
// Create a new router instance using the 'express.Router()' method
const router = express.Router();
// These models represent the database tables and allow me to interact with the database
const { User, Post, Comment } = require('../../models');
// This middleware is used to check if a user is authenticated before allowing access to certain routes
// It is used as a middleware in routes that require authentication
const withAuth = require('../../utils/auth');