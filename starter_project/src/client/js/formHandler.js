// Replace checkForName with a function that checks the URL
import {checkForName} from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8001/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

// Function to send data to the server
function sendToServer(url) {
    const serverURL = 'http://localhost:8001/api';  // Make sure this is correct

    // create a post request
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })  // Send the URL in the request body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse JSON response
        })
        .then(data => {
            console.log('Server response:', data);

            // Update the results on the webpage
            const resultsElement = document.getElementById('results');
            if (resultsElement) {
                console.log('Results element found');
                resultsElement.innerText = JSON.stringify(data, null, 2);
            } else {
                console.error('Element with ID "results" not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);  // Log errors
        });
}

// handle the form submission
function handleSubmit(event) {
    event.preventDefault();//prevent defeult submission behavior

    const formText = document.getElementById('name').value;// get the url
    if (checkForName(formText)) {
        sendToServer(formText);
    } else {
        alert('error occurred');
    }
}

// Export the handleSubmit function
export {handleSubmit};

