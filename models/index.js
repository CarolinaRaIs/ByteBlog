const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Associations between User and Post
//User.hasMany(Post) = user can have many posts
//'user_id' in the Post model is associated with the 'id' field in the User model.
//If a User is deleted, all their Posts and Comments will be deleted. 
    //onDelete: 'CASCADE' in Sequelize is typically used in the hasMany association, not the belongsTo
    //onDelete: 'CASCADE' option ensures that when the "one" side of the relationship is deleted, all associated records on the "many" side are also deleted
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//Associations between Post and User
//Post.belongsTo(User) = A post belongs to one user
//user_id' in the Post model is associated with the 'id' field in the User model.
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//Association
