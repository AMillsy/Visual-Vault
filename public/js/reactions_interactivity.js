const reactionHandler = async (event) => {
	event.preventDefault();
    alert('clicked');

    // const response = await fetch('/api/users/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // if (response.ok) {
	// 		// If successful, redirect the browser to the profile page
	// 		document.location.replace('/profile');
	// 	} else {
	// 		alert(response.statusText);
	// 	}
};

document
	.querySelector('div.reaction-buttons')
	.addEventListener('click', reactionHandler);

document
	.querySelector('div.reaction-buttons')
	.addEventListener('click', reactionHandler);
