const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const socialRoutes = require(`./socialRoutes`);
const imageRoutes = require(`./imageRoutes`);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use(`/socials`, socialRoutes);
router.use(`/images`, imageRoutes);

module.exports = router;
