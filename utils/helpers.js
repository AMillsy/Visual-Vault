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
