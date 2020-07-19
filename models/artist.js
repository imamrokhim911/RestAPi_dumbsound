'use strict';
module.exports = (sequelize, DataTypes) => {
	const Artist = sequelize.define(
		'Artist',
		{
			name: DataTypes.STRING,
			old: DataTypes.STRING,
			genre: DataTypes.STRING,
			start: DataTypes.STRING
		},
		{}
	);
	Artist.associate = function (models) {
	};
	return Artist;
};
