// Require the connection
const sequelize = require('../config/connection');

// Require the models
const User = require('../models/User')
const Post = require('../models/Post')
const Comment  = require('../models/Comment')

// Seed data for users
const usersData = [
    {
        username: 'Daniel',
        password: 'test_test_123'
    },
    {
        username: 'Veronica',
        password: 'test_test_123'
    },
    {
        username: 'Frida',
        password: 'test_test_123'
    },
    {
        username: 'Perla',
        password: 'test_test_123'
    },
];

// Seed data for posts
const postsData = [
    {
        title: 'I love Saturdays',
        content: 'test content 1',
        user_id: 1
    },
    {
        title: 'Progress is key',
        content: 'test content 2',
        user_id: 2
    },
    {
        title: 'I hope I can go to the art museum',
        content: 'test content 3',
        user_id: 3
    },
    {
        title: 'Ever expected more?',
        content: 'test content 4',
        user_id: 4
    },
];

// Seed data for comments
const commentsData = [
    {
        comment_text: 'Wednesdays are better',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Someone feels motivated!',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'I hope I see you there!',
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: 'TOTALLY',
        user_id: 4,
        post_id: 4
    },
];

// Create a function to seed data
const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(usersData, {
            individualHooks: true,
        });

        await Post.bulkCreate(postsData);

        await Comment.bulkCreate(commentsData);

        console.log('Database seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
