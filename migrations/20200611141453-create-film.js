'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Songs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			year: {
				type: Sequelize.INTEGER
			},
			thumbnail: {
				type: Sequelize.STRING
			},

			attache: {
				type: Sequelize.STRING
			},
			artisId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Artists',
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
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Songs');
	}
};
