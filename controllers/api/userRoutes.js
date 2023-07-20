const router = require('express').Router();
const { response } = require('express');
const { uploadProjects, uploadUsers, s3 } = require('../../config');
const { User } = require('../../models');
require('dotenv').config();
router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});

		if (!userData) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			req.session.profile = userData.profile_image_link;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

router.post(`/image`, uploadUsers.single(`image`), async (req, res, next) => {
	if (!req.file) return res.status(400).json({ message: 'No image sent' });

	const { key, location } = req.file;

	try {
		const getUser = await User.findByPk(req.session.user_id);
		const getData = getUser.get({ plain: true });
		const { profile_image_key } = getData;
		const params = {
			Bucket: process.env.AWS_BUCKET,
			Key: profile_image_key,
		};
		if (profile_image_key) {
			s3.deleteObject(params, function (err, data) {
				if (err)
					res.status(400).json({
						message: 'Error removing profile image',
					});
				else console.log(data);
			});
		}

		const userData = await User.update(
			{ profile_image_link: location, profile_image_key: key },
			{ where: { id: req.session.user_id } }
		);
		const getUserData = await User.findByPk(req.session.user_id, {
			raw: true,
		});

		req.session.save(() => {
			req.session.profile = getUserData.profile_image_link;

			res.status(200).json(userData);
		});
	} catch (error) {
		res.status(200).json(error);
	}
});

router.post('/github', async (req, res) => {
	if (!req.body) return res.status(400).json({ message: 'No link sent' });

	const { link } = req.body;
	try {
		const userUpdate = await User.update(
			{ github_username: link },
			{ where: { id: req.session.user_id } }
		);

		if (!userUpdate)
			return res.status(400).json({ message: 'No user found' });

		res.status(200).json(userUpdate);
	} catch (error) {
		res.status(400).json(error);
	}
});
module.exports = router;
