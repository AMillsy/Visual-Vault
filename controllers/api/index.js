const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const socialRoutes = require(`./socialRoutes`);

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use(`/socials`, socialRoutes);

module.exports = router;
