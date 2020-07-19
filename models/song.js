'use strict';
module.exports = (sequelize, DataTypes) => {
	const Song = sequelize.define(
		'Song', {
		title: DataTypes.STRING,
		year: DataTypes.STRING,
		thumbnail: DataTypes.STRING,
		attache: DataTypes.STRING,
		artisId: DataTypes.STRING
	}, {
		tableName: 'Songs'
	}
	);
	Song.associate = function (models) {
		Song.belongsTo(models.Artist, {
			as: 'artist',
			foreignKey: {
				name: 'artisId'
			}
		});
	};
	return Song;
};