const reactionButtonEls = document.querySelectorAll('button.reaction-button');

reactionButtonEls.forEach((button) => {
	button.addEventListener('click', async function () {
		project_id = this.closest('.reaction-buttons').getAttribute('data-id');
		var type = '';
		var numberReacts = parseInt(this.innerText);

		var listOfClasses = this.classList;
		// sets type to whats in class
		switch (true) {
			case listOfClasses.contains('thumbs_up'):
				type = 'thumbs-up';
				break;

			case listOfClasses.contains('stars'):
				type = 'stars';
				break;

			case listOfClasses.contains('heart'):
				type = 'heart';
				break;

			case listOfClasses.contains('bullseye'):
				type = 'bullseye';
				break;

			default:
				break;
		}

		if (this.classList.contains('active-reaction')) {
			// remove class that makes it appear active
			this.classList.remove('active-reaction');
			numberReacts -= 1;
			this.innerText = numberReacts;

			// remove reaction from db
			const response = await fetch('/api/reactions', {
				method: 'DELETE',
				body: JSON.stringify({
					type: type,
					project_id: project_id,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
			} else {
				alert(response.statusText);
			}
		} else {
			// add class that makes it appear active
			this.classList.add('active-reaction');
			numberReacts += 1;
			this.innerText = numberReacts;

			// add reaction to db
			const response = await fetch('/api/reactions', {
				method: 'POST',
				body: JSON.stringify({
					type: type,
					project_id: project_id,
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
			} else {
				alert(response.statusText);
			}
		}
	});
});
