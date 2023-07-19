const exphbs = require('express-handlebars');

module.exports = {
	format_date: (date) => {
		const projectDate = new Date(date);
		// Format date as MM/DD/YYYY
		const dateNow = new Date();

		const comparedDates = dateNow - projectDate;
		const totalHours = comparedDates / (1000 * 3600);
		if (totalHours < 1) return `Less an a hour ago`;

		const totalDays = totalHours / 24;

		if (totalDays < 1) return `${Math.floor(totalHours)} hours ago`;
		console.log(totalHours);
		return projectDate.toLocaleDateString(`en`, {
			minute: '2-digit',
			hour: '2-digit',
		});
	},
	format_amount: (amount) => {
		// format large numbers with commas
		return parseInt(amount).toLocaleString();
	},
	return_string: (data) => {
		return JSON.stringify(data);
	},
	button_thumbs: (reactions, userId) => {
		let thumbs_count = 0;
		let active = '';
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'thumbs-up') {
				thumbs_count += 1;
				if (reactions[i].user_id === userId) {
					active = 'active-reaction';
				}
			}
		}

		var buttonString = `<button class="reaction-button thumbs_up bi bi-hand-thumbs-up-fill ${active}">${thumbs_count}</button>`;

		return buttonString;
	},
	button_stars: (reactions, userId) => {
		let stars_count = 0;
		let active = '';
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'stars') {
				stars_count += 1;
				if (reactions[i].user_id === userId) {
					active = 'active-reaction';
				}
			}
		}

		return `<button class="reaction-button stars bi bi-stars ${active}">${stars_count}
    </button>`;
	},
	button_heart: (reactions, userId) => {
		let heart_count = 0;
		let active = '';
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'heart') {
				heart_count += 1;
				if (reactions[i].user_id === userId) {
					active = 'active-reaction';
				}
			}
		}
		return `<button class="reaction-button heart bi bi-heart-fill ${active}">${heart_count}</button>`;
	},
	button_bullseye: (reactions, userId) => {
		let bullseye_count = 0;
		let active = '';
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'bullseye') {
				bullseye_count += 1;
				if (reactions[i].user_id === userId) {
					active = 'active-reaction';
				}
			}
		}
		return `<button class="reaction-button bullseye bi bi-bullseye ${active}">${bullseye_count}</button>`;
	},
	getSocialImage: (social) => {
		switch (social) {
			case `github`:
				return `./images/github.png`;
			case `twitter`:
				return `./images/twitter.png`; //twitter image saved locally "/images/twitter.png"
			case 'instagram':
				return `./images/instagram.png`;
			case 'facebook':
				return `./images/facebook.png`;
			case 'linkedin':
				return `./images/linkedin.png`;
			default:
				return; //Basic social image, or no image at all
		}
	},
	getGithubLink: (githubName) => {
		return `https://github.com/${githubName}`;
	},
	active_reaction: (reactions, userId) => {
		var newClass = '';
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].user_id === userId) {
				newClass = 'active-reaction';
			}
		}
		//set this to return "active-reaction" if the logged in user created it.
		// if ( reactions.some() )
	},
	getProfileImage: (profileLink) => {
		if (!profileLink) return './images/userIcon.png';

		return profileLink;
	},
};
