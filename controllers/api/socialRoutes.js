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

//ID IS THE SOCIAL LINKS ID IN THE DATABASE, THIS WILL BE ON THE ELEMENT

//IF THE SOCIAL HAS BEEN DELETE, IT WILL RESPONSED WITH "1"
router.delete(`/:id`, async (req, res) => {
	try {
		const deleteSocial = await Social.destroy({
			where: { id: req.params.id },
		});

		res.status(200).json(deleteSocial);
	} catch (error) {
		res.status(400).json(error);
	}
});
module.exports = router;
