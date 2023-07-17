const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

User.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
		github_username: {
			type: DataTypes.STRING,
			unique: true,
		},
		profile_image_link: {
			type: DataTypes.STRING,
		},
		profile_image_key: {
			type: DataTypes.STRING,
		},
	},
	{
		hooks: {
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(
					newUserData.password,
					10
				);
				return newUserData;
			},
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},
		sequelize,
		underscored: true,
		freezeTableName: true,
		modelName: 'user',
	}
);

module.exports = User;
