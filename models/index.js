const User = require('./User');
const Project = require('./Project');
const Reaction = require('./Reaction');
const Social = require('./Social');
const Project_Image = require('./Project-Image');
User.hasMany(Project, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Project.belongsTo(User, {
	foreignKey: 'user_id',
});

User.hasMany(Reaction, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Reaction.belongsTo(User, {
	foreignKey: 'user_id',
});

Project.hasMany(Reaction, {
	foreignKey: 'project_id',
	onDelete: 'CASCADE',
});

Reaction.belongsTo(Project, {
	foreignKey: 'project_id',
});

User.hasMany(Social, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Social.belongsTo(User, {
	foreignKey: 'user_id',
});

Project.hasMany(Project_Image, {
	foreignKey: `project_id`,
	onDelete: `CASCADE`,
});

Project_Image.belongsTo(Project, {
	foreignKey: `project_id`,
});
module.exports = { User, Project, Reaction, Social, Project_Image };
