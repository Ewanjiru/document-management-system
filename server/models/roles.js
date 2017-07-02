'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
      classMethods: {
        associate: (models) => {
          roles.hasMany(models.users, {
            foreignKey: 'roleType',
            as: 'users'
          });
        }
      }
    });
  return roles;
};