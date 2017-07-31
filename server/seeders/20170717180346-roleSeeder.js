module.exports = {
  up: queryInterface => queryInterface.bulkInsert('roles', [
    { role: 'admin', createdAt: new Date(), updatedAt: new Date() },
    { role: 'support engineer', createdAt: new Date(), updatedAt: new Date() }
  ]),
  down: queryInterface => queryInterface.bulkDelete('roles', null, {})
};
