'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      classMethods: {
        associate: (models) => {
          roles.hasMany(models.users, {
            foreignKey: 'roleId',
            as: 'users'
          });
        }
      }
    });
  return roles;
};