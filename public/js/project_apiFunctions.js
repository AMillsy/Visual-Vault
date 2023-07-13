const { response } = require('express');

async function addProject(e) {
	//e.preventDefault();

	//Get the parameters from the html

	//Create a project.

	const response = await fetch('/api/project/', {
		method: 'POST',
		body: JSON.stringify({
			/**DATA THATS IN THE PROJECT */
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	//Response will return it all back, we just need the id

	//Now we need to link the images to the project

	//THE FORM NEEDS THIS ----> enctype="multipart/form-data" -- TELLS THE SERVER WE ARE SENDING BINARY

	const id = 1; // GET THE ID FROM THE PROJECT RESPONSE

	const imageResponse = await fetch(`/api/project/images/${id}`, {
		method: `POST`,
		body: JSON.stringify({
			/**IMAGE DATA */
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	// This will create a database with an id and the images link and the project id, the image is linked to.

	//Then we could do something like...

	if (response.ok && imageResponse.ok) {
		window.location.reload(``);
	} else {
		//Display error message on screen
	}
}

async function deleteProject(e) {
	e.preventDefault();

	//Keep the id of each project in an element
	//Go that  element with the id
	const id = 1; // <---- will equal the project id
	//Then call

	const response = await fetch(`/api/projects/${id}`, {
		method: `DELETE`,
	});

	if (response.ok) {
		//Reload the page to show the user that the project has been deleted
		window.location.reload();
	}
}

async function createUser(e) {
	e.preventDefault();

	//CHECK IF THEY FILLED IN ALL THE FIELDS

	//Get all the users data

	const userResponse = await fetch(`/api/users/`, {
		method: `POST`,
		body: JSON.stringify({
			/**USER CONTENT */
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (!userResponse.ok) return; // ERROR MESSAGE ON SCREEN

	//Social type, list selector
	//Social other, if they select other, they can write the socials name
	//external_link, the link to there page

	const id = 2; //GET THE ID FROM THE USER RESPONSE

	const socials = {
		social_type: `Instagram`,
		social_other: ``,
		external_link: `https://www.instagram.com/`,
	};

	const socialResponse = await fetch(`/api/socials/${id}`);

	if (socialResponse.ok) {
		return; // reload the page or say something
	}
	return; //Error with uploading social links try again
}

async function updateSocial(e) {
	e.preventDefault();

	//GET THE ELEMENTS SOCIAL ID
	const id = 4;

	const external_link = `newwebsite.com`;
	const response = await fetch(`/api/socials/${id}`, {
		method: `PUT`,
		body: JSON.stringify({ external_link }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		return; // Message, We have updated the link and then you dynamically put the link in or refresh the page
	} else {
		return; // Error message from the response
	}
}
