module.exports = {
  up(queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('roles', [
        { role: 'admin', createdAt: Date.now(), updatedAt: Date.now() },
        { role: 'support engineer', createdAt: Date.now(), updatedAt: Date.now() }
      ])
    ];
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
