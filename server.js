// Importing required dependencies
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

const { sequelize } = require('./config/connection');
const routes = require('./controllers');
const helper = require('./utils/helper');
require('dotenv').config() 

// Log the environment variables to verify they are being read correctly
console.log(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD
);

// Initialize Sequelize with session store
const SequelizeSessionStore = require('connect-session-sequelize')(session.Store);

// Initialize Express app 
const server = express();
// Define port
const SERVER_PORT = process.env.PORT || 3001;

// Set up middleware for parsing request body and serving static files
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

// Set up session configuration
const sessionConfig = {
    secret: process.env.SECRET,
    //session expires in 30 minutes 
    //30min * 60s/min * 1000ms/s
    cookie: { expires: 30 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeSessionStore({ db: sequelize })
};

// Initialize sessions middleware for use with Express
server.use(session(sessionConfig));

// Set up handlebars
const handlebars = exphbs.create({ helper });
    // Registering Handlebars as a new template engine in Express. 
    // The first argument is the name of the template engine ('handlebars')
    // The second argument is the template engine itself 
server.engine('handlebars', handlebars.engine);
    // Telling Express to use Handlebars as the default view engine. This means that when render a template, won't have to specify that using Handlebars, as Express will assume it by default.
server.set('view engine', 'handlebars');

// Define routes for the server
server.use(routes);

// Sync Sequelize models to the database...
    //When force is set to false (the default), this will not drop the table even if it already exists. Instead, it will just attempt to create the table. If the table already exists, Sequelize will do nothing.
    //When force is set to true, it will drop (delete) the table first if it already exists, and then create a new one.  Be careful with this in a production environment because you can lose data.
sequelize.sync({ force: false }).then(() => {
    // then....turn on server
    server.listen(SERVER_PORT, () =>
    console.log(`Server is now listening on port ${SERVER_PORT}`)
    );
});

