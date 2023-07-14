module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	format_amount: (amount) => {
		// format large numbers with commas
		return parseInt(amount).toLocaleString();
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
