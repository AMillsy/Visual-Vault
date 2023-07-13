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
