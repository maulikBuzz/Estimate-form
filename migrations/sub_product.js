'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_pro_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'user_products',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING(164),
        allowNull: false,
      },
      uom: {
        type: "longtext",
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: "1"
      },
      deleted_at: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: "0"
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
      ALTER TABLE sub_product 
      MODIFY updated_at TIMESTAMP 
      DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP;
    `);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('sub_product');
  }
};