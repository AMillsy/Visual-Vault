const router = require('express').Router();
const { Project, User, Reaction, Social, Project_Image } = require('../models');
const { sequelize } = require('../config');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		// Get all projects and JOIN with user data and reactions
		const projectData = await Project.findAll({
			include: [
				{
					model: Reaction,
					attributes: ['type', 'user_id'],
				},
				{
					model: User,
					attributes: ['id', 'name'],
				},
			],
		});
		// Serialize data so the template can read it
		const projects = projectData.map((project) =>
			project.get({ plain: true })
		);

		// Pass serialized data and session flag into template
		res.render('homepage', {
			projects,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//IF YOU WANT TO KNOW WHAT IS FULLY COMING BACK
//USE POSTMAN AND DO -- http://localhost:3001/api/projects/2 <--- Get request
router.get('/project/:id', async (req, res) => {
	try {
		const projectData = await Project.findByPk(req.params.id, {
			include: [
				{
					model: Reaction,
					attributes: ['type', 'user_id'],
				},
				{
					model: User,
					attributes: [
						'name',
						'github_username',
						'profile_image_link',
					],
					include: [
						{
							model: Social,
							attributes: [
								'social_type',
								'social_other',
								'external_link',
							],
						},
					],
				},
				{ model: Project_Image },
			],
		});
		const project = projectData.get({ plain: true });

		res.render('project', {
			project: project,
			logged_in: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json({ message: `AN ERROR HAS OCCURRED` });
	}
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [
				{ model: Project },
				{ model: Social },
				{ model: Reaction },
			],
		});

		const user = userData.get({ plain: true });

		res.render('profile', {
			...user,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}

	res.render('login');
});

router.get(`/signup`, (req, res) => {
	if (req.session.logged_in) {
		res.redirect(`/profile`);
		return;
	}

	res.render(`/signup`);
});

router.get(`/recent`, withAuth, async (req, res) => {
	try {
		const projectData = await Project.findAll({
			include: [
				{
					model: Reaction,
					attributes: ['type', 'user_id'],
				},
				{
					model: User,
					attributes: ['id', 'name'],
				},
			],
			limit: 10,
			order: [[`updatedAt`, `DESC`]],
		});

		if (!projectData)
			return res.status(400).json({ message: `No project data found ` });

		const projects = projectData.map((project) => {
			return project.get({ plain: true });
		});

		console.log(projects);
		res.render(`recent`, { projects, logged_in: req.session.logged_in });
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/search', async (req, res) => {
	const Op = sequelize.Op;
	console.log('Entering the search function');
	const search = req.query.search;
	console.log(search);

	try {
		const findUser = User.findAll({ where: {} });
	} catch (error) {}
	res.status(200).json(search);
});
module.exports = router;

/**
try {
	const projectData = await Project.findByPk(req.params.id, {
		include: [
			{
				model: User,
				attributes: ['name', 'github_username', 'profile_image'],
				include: [
					{
						model: Social,
						attributes: [
							'social_type',
							'social_other',
							'external_link',
						],
					},
				],
			},
			{ model: Project_Image },
		],
	});

	if (!projectData)
		return res.status(400).json({ message: 'No Project found' });

	const project = projectData.get({ plain: true });
	const reactionData = await sequelize.query(
		`SELECT type, COUNT(type) as total FROM reaction WHERE reaction.project_id = ${req.params.id} GROUP BY type;`,
		{ type: Sequelize.QueryTypes.SELECT }
	);

	console.log(`I AM HERE`);
	res.render(`project`, {
		project: project,
		reaction: reactionData,
		logged_in: req.session.logged_in,
	});
} catch (error) {
	res.status(400).json(error);
}
 */
