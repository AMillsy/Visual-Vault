const { Reaction } = require('../../models');
const router = require('express').Router();

router.post(`/`, async (req, res) => {
	const { type, project_id } = req.body;
	try {
		const newReaction = await Reaction.create({
			type: type,
			user_id: req.session.user_id,
			project_id: project_id,
		});

		res.status(200).json(newReaction);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get(`/`, async (req, res) => {
	const { project_id } = req.body;
	try {
		const reactionData = await Reaction.findAll({
			where: {
				project_id: project_id,
			},
		});

		if (!reactionData) {
			res.status(404).json({
				message: 'No reactions for this project id',
			});
			return;
		}

		res.status(200).json(reactionData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/', async (req, res) => {
	const { type, project_id } = req.body;
	try {
		const reactionData = await Reaction.destroy({
			where: {
				type: type,
				user_id: req.session.user_id,
				project_id: project_id,
			},
		});

		if (!reactionData) {
			res.status(404).json({
				message: 'No reaction found with this id!',
			});
			return;
		}

		res.status(200).json(reactionData);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
