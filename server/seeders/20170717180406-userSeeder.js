const bcrypt = require('bcrypt');

const SALT_FACTOR = 5;
const salt = bcrypt.genSaltSync(SALT_FACTOR);

module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('users', [{
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@test.com',
        password: bcrypt.hashSync('Qwerty@1234', salt),
        roleType: 'admin',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      ])
    ];
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
