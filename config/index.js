const { uploadProjects, uploadUsers, s3 } = require(`./s3connection`);
const { sequelize } = require('./connection');

module.exports = { uploadProjects, uploadUsers, s3, sequelize };
