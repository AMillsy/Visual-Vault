const router = require('express').Router();
const { Social } = require('../../models');

//ID WILL BE THE USERS ID
router.post('/:id', async (req, res) => {
	const { social_type, social_other, external_link } = req.body;
	try {
		const socialData = await Social.create({
			social_type: social_type,
			social_other: social_other,
			external_link: external_link,
			user_id: req.params.id,
		});

		res.status(200).json(socialData);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
