const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
	{
		project_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		caption: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		deployed_link: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: true,
			},
		},
		repo_link: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: true,
			},
		},
	},
	{
		sequelize,
		underscored: true,
		freezeTableName: true,
		modelName: 'project',
	}
);

module.exports = Project;
