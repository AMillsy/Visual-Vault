const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const socialRoutes = require(`./socialRoutes`);
const imageRoutes = require(`./imageRoutes`);
const reactionRoutes = require('./reactionRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use(`/socials`, socialRoutes);
router.use(`/images`, imageRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;
