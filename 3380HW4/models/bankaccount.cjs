'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankAccount.init({
    accountid: DataTypes.INTEGER,
    bankname: DataTypes.STRING,
    accountnumber: DataTypes.INTEGER,
    accountype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BankAccount',
  });
  return BankAccount;
};