const profile_preview = document.querySelector(`#profile-preview`);
const profile_picture = document.querySelector(`#profile-picture`);
const profile_form = document.querySelector('#profile-form');

profile_form.addEventListener('submit', async function (e) {
	e.preventDefault();
	const [file] = profile_picture.files;
	const formData = new FormData();
	formData.append(`image`, file, file.name);

	const response = await fetch(`/api/users/image`, {
		method: `POST`,
		body: formData,
	});

	if (!response) return console.log(`Error has occured with profile submit`);

	window.location.reload();
});

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/projects/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/profile');
		} else {
			alert('Failed to delete project');
		}
	}
};
profile_picture.onchange = function () {
	const [file] = profile_picture.files;
	profile_preview.innerHTML = '';
	if (file) {
		console.log('We have an image');
		const url = URL.createObjectURL(file);

		const el = document.createElement('img');
		el.classList.add('preview-image');
		el.classList.add('preview-profile');
		el.src = url;
		console.log(el);
		profile_preview.insertAdjacentElement('afterbegin', el);
	}
};

document
	.querySelector('.project-list')
	.addEventListener('click', delButtonHandler);
