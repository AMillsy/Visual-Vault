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
	reaction_count_string: (reactions) => {
		var reaction_count = {
			thumbs_up: 0,
			star_struck: 0,
			heart: 0,
			clap: 0,
		};

		for (let i = 0; i < reactions.length; i++) {
			switch (reactions[i].type) {
				case 'thumbs-up':
					reaction_count.thumbs_up += 1;
					break;
				
				case 'star-struck':
					reaction_count.star_struck += 1;
					break;

				case 'heart':
					reaction_count.heart += 1;
					break;
				
				case 'clap':
					reaction_count.clap += 1;

				default:
					break;
			}
			
		}

		return JSON.stringify(reaction_count);
	},
	reaction_count: (reactions) => {
		var reaction_count = {
			thumbs_up: 0,
			star_struck: 0,
			heart: 0,
			clap: 0,
		};

		for (let i = 0; i < reactions.length; i++) {
			switch (reactions[i].type) {
				case 'thumbs-up':
					reaction_count.thumbs_up += 1;
					break;
				
				case 'star-struck':
					reaction_count.star_struck += 1;
					break;

				case 'heart':
					reaction_count.heart += 1;
					break;
				
				case 'clap':
					reaction_count.clap += 1;

				default:
					break;
			}
			
		}

		return reaction_count;
	},
	getSocialImage: (social) => {
		switch (social) {
			case `twitter`:
				return; //twitter image saved locally "/images/twitter.png"
			case 'instagram':
				break;
			case 'facebook':
				break;
			case 'linkedin':
				break;
			default:
				return; //Basic social image, or no image at all
		}
	},

	getGithubLink: (githubName) => {
		return `https://github.com/${githubName}`;
	},
};
