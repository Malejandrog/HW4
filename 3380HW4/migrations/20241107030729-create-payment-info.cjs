'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentinfoid: {
        type: Sequelize.INTEGER
      },
      customerid: {
        type: Sequelize.INTEGER
      },
      creditcardnumber: {
        type: Sequelize.STRING
      },
      ccv: {
        type: Sequelize.INTEGER
      },
      expirationdate: {
        type: Sequelize.STRING
      },
      billingaddress: {
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
    await queryInterface.dropTable('PaymentInfos');
  }
};