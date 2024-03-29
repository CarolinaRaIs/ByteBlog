const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      //This is used for longer string variables. 
      //DataTypes.TEXT can store a string with a maximum length of 65,535 characters which is the flexibility needed for a blog.
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    //Foreign key to Users table (data)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: "user",
      key: "id",
      },
    },
    
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;