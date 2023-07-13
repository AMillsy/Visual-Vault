const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const reactionData = require('./reactionData.json');
const socialData = require('./socialData.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
	});

	await User.bulkCreate(projectData);

	await User.bulkCreate(reactionData);

	await User.bulkCreate(socialData);

	process.exit(0);
};

seedDatabase();
