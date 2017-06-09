'use strict';
module.exports = (sequelize, DataTypes) => {
  var documents = sequelize.define('documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
      classMethods: {
        associate: (models) => {
          documents.belongsTo(models.users, {
            foreignKey: 'userId',
            OnDelete: 'CASCADE',
          })
        },
      },
    });
  return documents;
};
