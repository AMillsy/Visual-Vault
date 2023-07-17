const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class project_image extends Model {}

project_image.init(
	{
		key: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			},
		},
		project_id: {
			type: DataTypes.INTEGER,
			references: {
				model: `project`,
				key: `id`,
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'project_image',
	}
);

module.exports = project_image;
