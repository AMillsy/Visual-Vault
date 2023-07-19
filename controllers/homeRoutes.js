const router = require('express').Router();
const { Project, User, Reaction, Social, Project_Image } = require('../models');
const { Op } = require('sequelize');
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
					attributes: [
						'id', 
						'name', 
						'profile_image_link' 
					],
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
			profileImage: req.session.profile,
			userId: req.session.user_id
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
			profileImage: req.session.profile,
			userId: req.session.user_id
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
		console.log(user);
		res.render('profile', {
			...user,
			logged_in: req.session.logged_in,
			profileImage: req.session.profile,
			userId: req.session.user_id
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/profile/:id', async (req, res) => {
	try {
		// Find user based on the url parameter ID
		const userData = await User.findByPk(req.params.id, {
			attributes: { exclude: ['password'] },
			include: [
				{ model: Social },
				{ model: Project,
				include: [
					{
						model: Reaction,
						attributes: ['type', 'user_id'],
					}
				]}
			],
		});

		if (!userData) {
			return res.status(400).json({ message: 'No user found by that id' });
		}

		const user = userData.get({ plain: true });
		console.log(user);
		res.render('viewprofile', {
			...user,
			logged_in: req.session.logged_in,
			profileImage: req.session.profile,
			userId: req.session.user_id
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

		res.render(`recent`, {
			projects,
			logged_in: req.session.logged_in,
			profileImage: req.session.profile,
			userId: req.session.user_id
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/search', async (req, res) => {
	const search = req.query.search;
	try {
		const findUser = await User.findAll({
			attributes: ['name', 'id'],
			where: {
				name: {
					[Op.like]: `%${search}%`,
				},
			},
		});

		const userData = findUser.map((user) => {
			return user.get({ plain: true });
		});
		const findProject = await Project.findAll({
			include: [
				{
					model: Reaction,
					attributes: ['type', 'user_id'],
				},
			],
			where: {
				project_name: { [Op.like]: `%${search}%` },
			},
		});

		const projectData = findProject.map((project) => {
			return project.get({ plain: true });
		});

		res.render('search', {
			users: userData,
			projects: projectData,
			profileImage: req.session.profile,
			userId: req.session.user_id
		});
	} catch (error) {
		res.status(400).json({ message: "Can't find anything" });
	}
});

router.get('/create', withAuth, (req, res) => {
	res.render('createproject', { 
		logged_in: req.session.logged_in,
		profileImage: req.session.profile,
		userId: req.session.user_id
	});
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
