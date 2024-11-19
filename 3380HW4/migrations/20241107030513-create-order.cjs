'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderid: {
        type: Sequelize.INTEGER
      },
      locationid: {
        type: Sequelize.INTEGER
      },
      customerid: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      totalamount: {
        type: Sequelize.DECIMAL
      },
      taxamount: {
        type: Sequelize.DECIMAL
      },
      tipamount: {
        type: Sequelize.DECIMAL
      },
      paymentmethod: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};