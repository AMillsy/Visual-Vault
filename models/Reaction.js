const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reaction extends Model {}

Reaction.init(
	{
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		project_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'project',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		underscored: true,
		modelName: 'reaction',
	}
);

module.exports = Reaction;
