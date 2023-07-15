const { Project_Image } = require('../../models');

const router = require('express').Router();

router.get(`/`, async (req, res) => {
	const imageData = await Project_Image.findAll();

	res.status(200).json(imageData);
});

module.exports = router;
