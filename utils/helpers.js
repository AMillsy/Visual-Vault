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
	count_thumbs: (reactions) => {
		if (!reactions) return 0;
		let thumbs_count = 0;
		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'thumbs-up') {
				thumbs_count += 1;
			}
		}
		return thumbs_count;
	},
	count_stars: (reactions) => {
		if (!reactions) return 0;
		let stars_count = 0;

		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'stars') {
				stars_count += 1;
			}
		}
		return stars_count;
	},
	count_heart: (reactions) => {
		if (!reactions) return 0;
		let heart_count = 0;

		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'heart') {
				heart_count += 1;
			}
		}
		return heart_count;
	},
	count_bullseye: (reactions) => {
		if (!reactions) return 0;
		let bullseye_count = 0;

		for (let i = 0; i < reactions.length; i++) {
			if (reactions[i].type === 'bullseye') {
				bullseye_count += 1;
			}
		}
		return bullseye_count;
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
	active_reaction: (reactions) => {
		console.log(reactions);		
		
		//set this to return "active-reaction" if the logged in user created it.
		// if ( reactions.some() )
	}
};
