'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // mise en place relation Many to Many
    /*   models.User.belongsToMany(models.Post,{
        through: models.Like,
        foreignKey:'userId',
        otherKey: 'postId'
      });
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "postId",
        otherKey: "userId",
      });

      // lien entre clé etrangere et la table de reference
      models.User.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      models.User.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      }); */
    }
  };
  Like.init({
    postId:{
      type: DataTypes.INTEGER,
      references:{
        model: 'Post',
        key: 'id'
      }
    } ,
    userId:{
      type: DataTypes.INTEGER,
      references: {
        model:'User',
        key: 'id'
      }

    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};