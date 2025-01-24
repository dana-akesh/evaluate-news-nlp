// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
const serverURL = 'https://localhost:8000/api';

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    console.log('Form submitted:', formText);

    // Send the URL to the server
    postData(serverURL, { url: formText })
        .then((response) => {
            console.log('Server response:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to send data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    } catch (error) {
        console.error('Error in postData:', error);
        throw error;
    }
};

// Export the handleSubmit function
export { handleSubmit };
