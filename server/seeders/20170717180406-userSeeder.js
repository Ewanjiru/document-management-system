const bcrypt = require('bcrypt');

const SALT_FACTOR = 5;
const salt = bcrypt.genSaltSync(SALT_FACTOR);

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [{
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('Qwerty@1234', salt),
    roleType: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ]),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
