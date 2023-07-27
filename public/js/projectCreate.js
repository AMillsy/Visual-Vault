const project_name = document.querySelector(`#project-name`);
const project_github = document.querySelector(`#project-github`);
const project_description = document.querySelector(`#project-desc`);
const project_caption = document.querySelector(`#project-caption`);
const project_deployed = document.querySelector(`#project-deployed`);
const project_images = document.querySelector(`#project-images`);
const preview_container = document.querySelector(`.preview-container`);

const newFormHandler = async (event) => {
	event.preventDefault();

	const name = project_name.value.trim();
	const github = project_github.value;
	const description = project_description.value;
	const caption = project_caption.value.trim();
	const deployed = project_deployed.value.trim();

	if (!name || !caption || !description) return; //Warning message about needed sections need filling

	let method = '';
	let fetchCall = '';

	if (event.target.closest('form').hasAttribute('data-id')) {
		method = 'PUT';
		fetchCall = `/api/projects/${event.target.closest('form').dataset.id}`;
	} else {
		method = 'POST';
		fetchCall = `/api/projects`;
	}
	const response = await fetch(fetchCall, {
		method: method,
		body: JSON.stringify({
			project_name: name,
			caption: caption,
			description: description,
			deployed_link: deployed,
			repo_link: github,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) return alert(`Failed creating project`);

	//images

	const responseData = await response.json();
	const { id } = responseData;

	const files = project_images.files;
	const formData = new FormData();

	for (const file of files) {
		formData.append(`images`, file, file.name);
	}

	const imageResponse = await fetch(`/api/projects/images/${id}`, {
		method: `POST`,
		body: formData,
	});

	if (!imageResponse.ok) return; //Error message on the screen

	window.location.replace('/profile');
};

project_images.onchange = function () {
	const files = project_images.files;
	preview_container.innerHTML = '';
	if (files) {
		for (const file of files) {
			const url = URL.createObjectURL(file);
			const html = `<img class="preview-image" src="${url}">`;
			preview_container.insertAdjacentHTML('afterbegin', html);
		}
	}
};

document
	.querySelector('.new-project-form')
	.addEventListener('submit', newFormHandler);
