const bcrypt = require('bcrypt');

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
      hooks: {
        beforeCreate: user => {
        const SALT_FACTOR = 5;
        const salt = bcrypt.genSaltSync(SALT_FACTOR);
        user.password = bcrypt.hashSync(user.password,salt);        
        },
      },
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
        isPassword:(encodedPassword,password) =>{
          return bcrypt.compareSync(password,encodedPassword);
         
        }
      },
    });
  return users;
};
