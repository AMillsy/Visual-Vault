const router = require('express').Router();
const {
	Project,
	Project_Image,
	User,
	Reaction,
	Social,
} = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadProjects } = require(`../../config`);
const sequelize = require('../../config/connection');
const Sequelize = require('sequelize');

router.post('/', withAuth, async (req, res) => {
	const { project_name, caption, description, deployed_link, repo_link } =
		req.body;

	const deployed = deployed_link || null;
	const repo = repo_link || null;

	try {
		const newProject = await Project.create({
			project_name: project_name,
			caption: caption,
			description: description,
			deployed_link: deployed,
			repo_link: repo,
			user_id: req.session.user_id,
		});

		res.status(200).json(newProject);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const projectData = await Project.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!projectData) {
			res.status(404).json({ message: 'No project found with this id!' });
			return;
		}

		res.status(200).json(projectData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post(
	'/images/:id',
	uploadProjects.array(`images`, 5),
	async (req, res, next) => {
		if (typeof req.files.map !== `function`)
			return res.status(400).json({ message: 'Error sending images' });

		const imagesData = req.files.map(({ key, location }) => {
			return { key: key, link: location, project_id: req.params.id };
		});
		console.log(imagesData);

		try {
			const imagesResponse = await Project_Image.bulkCreate(imagesData);

			res.status(200).json(imagesResponse);
		} catch (error) {
			res.status(400).json(error);
		}
	}
);

router.get('/:id', async (req, res) => {
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
				{
					model: Reaction,
					attributes: ['type', 'user_id'], // added here so that we can make the reactions interactive
				},
				{ model: Project_Image },
			],
		});

		if (!projectData)
			return res.status(400).json({ message: 'No Project found' });

		const reactionData = await sequelize.query(
			`SELECT type, COUNT(type) as total FROM reaction WHERE reaction.project_id = ${req.params.id} GROUP BY type;`,
			{ type: Sequelize.QueryTypes.SELECT }
		);
		console.log(projectData);

		res.status(200).json(projectData);
	} catch (error) {
		res.status(400).json(error);
	}
});
module.exports = router;
