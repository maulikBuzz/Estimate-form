'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(164),
        allowNull: false,
      },
      bus_cat_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'business_categories',
          key: 'id',
        },
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    await queryInterface.sequelize.query(`
      ALTER TABLE products 
      MODIFY updated_at TIMESTAMP 
      DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP;
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};