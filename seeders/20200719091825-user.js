module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "John",
        email: "johanajisetiawan1118@gmail.com",
        password: "Miesedap18",
        role: 1,
        gender: "male",
        phone: "08978787878",
        address: "jalan cempaka nomer 212",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
