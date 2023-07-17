module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
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
};
