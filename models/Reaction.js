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
		freezeTableName: true,
		modelName: 'reaction',
	}
);

//Reaction.removeAttribute('id'); commented out as it was stopping reactions getting through

module.exports = Reaction;
