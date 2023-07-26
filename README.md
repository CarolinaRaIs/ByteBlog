# Byte Blog

![Badge](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents
---
* [License](#license)
* [Installation](#installation)
* [Packages](#packages)
* [Description](#description)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

<br>

## License 
---
[MIT License](./LICENSE) <br>

 <br>

## Installation
---
To get started with Byte Blog, follow these steps: 
1. Clone the Repository

    Open your terminal/command prompt, navigate to the directory where you want to clone the repository and run:

    `git clone https://github.com/YourUsername/ByteBlog.git`

    Replace YourUsername with your GitHub username.

2. Navigate into the Directory

    `cd ByteBlog`

3. Ensure you have Node.js installed on your computer. If you don't have it already, you can download it from their website

4. Check if MySQL is installed on your system. If not, you can download it from their website

3. Navigate to the project's root directory in your terminal and install the dependencies.

    Run the following command to install the project dependencies:

    `npm install`

4. Open the Project

    Open the project folder in your text editor.

5. For smoother development, consider installing Nodemon, a tool that automatically restarts the server when changes are made to the code. Install it globally using npm by running the following command:

    `npm install -g nodemon`

6. For testing API endpoints, I recommend using Insomnia. You can download it for free from their website

<br>

## Packages
---
General Technologies: 
- ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) A popular programming language used for creating dynamic and interactive websites. In this app, JavaScript is the primary language used for both front-end and back-end development.

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) A runtime environment that allows developers to run JavaScript on the server-side. It is used in this app to build the server and handle server-side operations, such as handling API requests.


- ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) A cloud platform that allows developers to deploy, manage, and scale applications. In this app, Heroku is used to host and deploy the application, making it accessible to users over the internet.

- ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) A version control system that enables developers to track changes in their code and collaborate with others. It is used in this app to manage the codebase and keep track of changes made to the project.


NPM Packages

- ![mysql2](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) A MySQL client for Node.js that allows the app to interact with the MySQL database. It is used to perform database operations, such as storing and retrieving data.

- ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) A development tool used to automatically restart the server whenever changes are made to the code. It enhances the development process by reducing the need for manual server restarts.

- ![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) A popular Node.js framework used for building web applications and APIs. In this app, Express.js is the core framework used to handle routing and manage server-side operations.


- ![sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue) An Object-Relational Mapping (ORM) library that simplifies database interactions by allowing developers to work with databases using JavaScript objects. In this app, Sequelize is used to define models and perform database queries.

     - connect-session-sequelize
     An extension of Express.js's session middleware that enables sessions to be stored in the database using Sequelize. It helps maintain user sessions and authentication.
     

- ![express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
    - express-session
    A middleware that helps manage user sessions in Express.js applications. It enables the app to maintain user sessions and implement user authentication.
    
    - express-handlebars
    A template engine for Express.js, allowing developers to render dynamic HTML templates. In this app, it is used to generate HTML pages with dynamic content.

- dotenv
a package used to manage environment variables in Node.js applications. It helps keep sensitive information, such as API keys and database credentials, separate from the code and safely stored as environment variables.

- bcrypt
A library used for encrypting and hashing passwords. In this app, Bcrypt is used to securely store user passwords in the database.

<br>

## Description
---
This project is a purposeful blog site exclusively designed for developers, providing a dedicated platform where tech enthusiasts can freely share their insights, opinions, articles, and engaging blog posts.

Upon visiting the site, you'll find a user-friendly homepage featuring existing blog posts and a convenient navigation bar for easy exploration. Any attempt to navigate away from the homepage will redirect you to the login page, ensuring a secure and personalized experience. Upon arriving at the login page, you have the choice to either log in with your existing account or register for a new account. Once you complete the sign-up process, you'll be seamlessly logged in and directed to your personalized dashboard. The dashboard serves as a central hub, providing an overview of your own posts and activities.
When you navigate to your dashboard, you have the ability to interact with your posts. Easily update or delete your existing posts, empowering efficient content management. When exploring the homepage and encountering posts from other users, you can delve into the associated comments and leave your insightful comment.

For a smooth and secure user experience, this project uses essential technologies like MySQL for database management, Sequelize as an ORM tool, and sessions to store login information. Your session remains active for 30 minutes, allowing ample time to explore and engage with the vibrant developer community.

<br>

## Usage 
---
After following the instructions in installation: 
1. Open the database file in your terminal. 

2. Run command 
    `mysql -uroot -p` 

3. Enter your password (keystrokes will not show).

4. Run the following command to set up the database and tables.
    `SOURCE schema.sql` 

5. Type `quit` in the command line to exit MySql.

6. Create a file called ".env" in the root folder of the project. Include the following information: 
    <br>
    `DB_NAME=''` <br>
    `DB_USER=''` <br>
    `DB_PASSWORD=''`<br>
    `SECRET=''`
    <br>

7. Open the `server.js` file in your integrated terminal. 

8. Run command 
    `npm run seed` (or `node seeds/index.js`) to seed the database.

9. Run command 
    `npm run start` (or `node server.js`)

10. Open `localhost:3001` in your browser and explore the live site.

11. After completion, stop Nodemon and terminate the session by pressing CONTROL-C in the terminal. 

To access the Github Repository visit:
https://github.com/CarolinaRaIs/ByteBlog

To access the deployed site visit:
 https://carolinarais.github.io/ByteBlog/

<br>

## Contributing 
---
This project was completed by CarolinaRaIs with the instruction of the University of Oregon Full Stack Development Bootcamp and assistance of keberlea. If you would like to contribute, please do and let me know if you have any questions.

<br>

## Questions?
---
Please contact me on Github at [CarolinaRaIs](https://github.com/CarolinaRaIs) or by [email](determination28@gmail.com).