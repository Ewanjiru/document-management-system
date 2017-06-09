'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      classMethods: {
        associate: (models) => {
          users.belongsTo(models.roles, {
            foreignKey: 'roleId',
            OnDelete: 'CASCADE',
          });
          users.hasMany(models.documents, {
            foreignKey: 'userId',
            as: 'userDocuments'
          });
        },
      },
    });
  return users;
};
