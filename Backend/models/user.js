'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post)
    }
     destroy () {
       const randomstring = Math.random().toString(36).slice(-8);
      return this.update({
        deleted: true,
        email: `deleted-user${this.id}@groupomania.com`,
        password: randomstring,
        imageurl:"http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png",
        firstname: "Utilisateur",
        lastname: "Supprimé",
      });
    }
  
  };
  User.init({
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};