'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      visibility: {
        type: Sequelize.ENUM('public', 'followers', 'private'),
        allowNull: false,
        defaultValue: 'public'
      },
      sharedPostId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
