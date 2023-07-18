const reactionButtonEls = document
.querySelectorAll('button.reaction-button');

const reactionHandler = async (event) => {
	event.preventDefault();
    
    project_id = event.srcElement.closest('.reaction-buttons').getAttribute('data-id');
    var type = "";
    
    var listOfClasses = event.srcElement.classList;
    // sets type to whats in class
    switch ( true ) {
        case listOfClasses.contains('thumbs_up'):
            type = "thumbs-up";
            break;

        case listOfClasses.contains('stars'):
            type = "stars";
            break;

        case listOfClasses.contains('heart'):
            type = "heart";
            break;

        case listOfClasses.contains('bullseye'):
            type = "bullseye";
            break;        

        default:
            break;
    };
    
    if (event.srcElement.classList.contains('active-reaction')) {
        // remove class that makes it appear active
        event.srcElement.classList.remove('active-reaction');

        // remove reaction from db
        const response = await fetch('/api/reactions', {
            method: 'DELETE',
            body: JSON.stringify({ 
                type: type,
                project_id: project_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
                console.log(response);
        } else {
            alert(response.statusText);
        };

    } else {
        // add class that makes it appear active
        event.srcElement.classList.add('active-reaction');

        // add reaction to db
        const response = await fetch('/api/reactions', {
            method: 'POST',
            body: JSON.stringify({ 
                type: type,
                project_id: project_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            console.log(response);
        } else {
            alert(response.statusText);
        };        
    };
    
};

reactionButtonEls.forEach( (button) => button.addEventListener('click', reactionHandler));