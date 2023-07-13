const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Social extends Model {}

Social.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		social_type: {
			// for choosing twitter, fb, linkedin, or other
			type: DataTypes.STRING,
			allowNull: false,
		},
		social_other: {
			// for entering name of 'other' type of social link
			type: DataTypes.STRING,
		},
		external_link: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true,
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'social',
	}
);

module.exports = Social;
