const project_name = document.querySelector(`#project-name`);
const project_github = document.querySelector(`#project-github`);
const project_description = document.querySelector(`#project-desc`);
const project_caption = document.querySelector(`#project-caption`);
const project_deployed = document.querySelector(`#project-deployed`);
const project_images = document.querySelector(`#project-images`);

const newFormHandler = async (event) => {
	event.preventDefault();

	const name = project_name.value.trim();
	const github = project_github.value;
	const description = project_description.value;
	const caption = project_caption.value.trim();
	const deployed = project_deployed.value.trim();

	if (!name || !caption || !description) return; //Warning message about needed sections need filling

	const response = await fetch(`/api/projects`, {
		method: 'POST',
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
	console.log(`Project id is: `, id);
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

	window.location.reload();
};

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

document
	.querySelector('.new-project-form')
	.addEventListener('submit', newFormHandler);

document
	.querySelector('.project-list')
	.addEventListener('click', delButtonHandler);
