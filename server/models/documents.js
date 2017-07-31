module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    title: {
      type: DataTypes.STRING,
      unique: true,
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
          });
        },
      },
    });
  return documents;
};