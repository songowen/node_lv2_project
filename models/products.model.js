'use strict';
const { Model, DataTypes } = require('sequelize');
const { Status } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {		
		static associate(models) {
      Product.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user"
      });
		}
	}
	Product.init(
		{
			title: {
        type: DataTypes.STRING,
        allowNull: false
      },
			content: {
        type: DataTypes.STRING,
        allowNull: false
      },
			userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
			status: {
        type: DataTypes.STRING,
        defaultValue: Status.SELLING
      }
		},
		{
			sequelize,
			modelName: 'Product',
      timestamps: true
		},
	);
	return Product;
};