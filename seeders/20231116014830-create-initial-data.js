'use strict';

const { Users, Products } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
    
      const user1 = await Users.create({
        email: 'user1@example.com',
        password: 'password1',
        name: 'User One',
      });

      const user2 = await Users.create({
        email: 'user2@example.com',
        password: 'password2',
        name: 'User Two',
      });

      // Create products
      const product1 = await Products.create({
        title: 'Product One',
        content: 'Description for product one',
        userId: user1.id,
        status: 'FOR_SALE',
      });

      const product2 = await Products.create({
        title: 'Product Two',
        content: 'Description for product two',
        userId: user2.id,
        status: 'SOLD_OUT',
      });

      console.log('Initial data created successfully.');
    } catch (error) {
      console.error('Error creating initial data:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
   
  },
};
