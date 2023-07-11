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
    social_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    external_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
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
    modelName: 'project',
  }
);

module.exports = Social;
