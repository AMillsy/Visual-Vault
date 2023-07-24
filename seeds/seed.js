const sequelize = require('../config/connection');
const { User, Project, Reaction, Social, Project_Image } = require('../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const reactionData = require('./reactionData.json');
const socialData = require('./socialData.json');
const projectImageData = require('./imageData.json');

const sess = {
	secret: 'Super secret secret',
	cookie: {
		maxAge: 60 * 60 * 24 * 1000,
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
	});

	await Project.bulkCreate(projectData);

	await Reaction.bulkCreate(reactionData);

	await Social.bulkCreate(socialData);
	await Project_Image.bulkCreate(projectImageData);
	process.exit(0);
};

seedDatabase();
