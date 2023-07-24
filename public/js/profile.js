const profile_preview = document.querySelector(`#profile-preview`);
const profile_picture = document.querySelector(`#profile-picture`);
const profile_form = document.querySelector('#profile-form');
const social_btn = document.querySelector(`.social-add`);
const socials_add = document.querySelector(`.social-create`);
const socials_create_container = document.querySelector('#add-socials');
const social_container = document.querySelector('.social-title');
const github_form = document.querySelector('#github-link-form');
const github_link = document.querySelector('#github-profile-link');
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

// document
// 	.querySelector('.project-list')
// 	.addEventListener('click', delButtonHandler);

social_btn.addEventListener('click', function (e) {
	console.log(`Click`);
	const html = `<div class="social-create-container">
		<select id="socials" name="socials">
  			<option value="instagram">Instagram</option>
 			<option value="twitter">Twitter</option>
  			<option value="linkedin">LinkedIn</option>
  			<option value="facebook">Facebook</option>
		</select>
		<input type="text" name="social-link" class="social-link-input" placeholder="Enter social link">
		<button class="social-btn social-create">Add</button>
		</div>
		`;

	socials_create_container.insertAdjacentHTML(`afterbegin`, html);
});

socials_create_container.addEventListener('click', async function (e) {
	if (!e.target.classList.contains('social-create')) return;
	console.log(e.target);
	const el = e.target;
	const container = el.closest('.social-create-container');
	const socialType = container.children[0].value;
	const link = container.children[1].value;
	console.log(container);
	console.log(socialType);
	console.log(link);

	const response = await fetch(`/api/socials`, {
		method: 'POST',
		body: JSON.stringify({
			social_type: socialType,
			external_link: link,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		container.remove();
		createSocial(socialType, link);
		return;
	}
});

function createSocial(socialType, socialLink) {
	const html = `<a href='${formatLink(socialLink)}'>
	<div class='social-img-con'>
		<img
			class='social-img'
			src='${getSocialImage(socialType)}'
			alt='${socialType}'
		/>
	</div>
</a>`;

	social_container.insertAdjacentHTML('afterend', html);
}

const getSocialImage = (social) => {
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
};

const formatLink = (link) => {
	if (link.includes('https://www')) return link;

	return `https://www.${link}`;
};

github_form.addEventListener('submit', async function (e) {
	e.preventDefault();
	const link = `https://github.com/${github_link.value}`;
	const response = await fetch('/api/users/github', {
		method: 'POST',
		body: JSON.stringify({
			link: link,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		window.location.reload();
		return;
	}
});
