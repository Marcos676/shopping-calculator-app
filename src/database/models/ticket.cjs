'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Ticket.init({
    name: DataTypes.STRING,
    productList: {
      type: DataTypes.JSON,
      field: 'product_list',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true, // Convierte automáticamente createdAt → created_at
    tableName: 'Tickets'
  });
  return Ticket;
};