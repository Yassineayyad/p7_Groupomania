// commande : sequelize model:create --attributes "USERS_Id:integer content:string imageURL:string likes:integer dislikes:integer" --name Post
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User,{
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  Post.init({
    USERS_Id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};