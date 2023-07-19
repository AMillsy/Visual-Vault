const arrayReactionButtonEls = document
.querySelectorAll('button.reaction-button');

const reactionHandler = async (event) => {
	event.preventDefault();

    const clickedButtonEl = event.srcElement;
    var number = parseInt(clickedButtonEl.innerText);
    const project_id = clickedButtonEl.closest('.reaction-buttons').getAttribute('data-id');
    var type = "";
    
    var listOfClasses = clickedButtonEl.classList;
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
            alert('not a reaction button that was clicked... not sure how you saw this alert...');
            break;
    };
    
    if (clickedButtonEl.classList.contains('active-reaction')) {
        // remove class that makes it appear active
        clickedButtonEl.classList.remove('active-reaction');
        number -= 1;
        clickedButtonEl.innerText(number);

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
        clickedButtonEl.classList.add('active-reaction');
        number += 1;
        clickedButtonEl.innerText(number);

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

arrayReactionButtonEls.forEach( (button) => {
        button.addEventListener('click', reactionHandler);
    });