// import the functions that will be used
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
// import all the css
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

//had to add it here because the jest doesnt allow the add even listener
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

//the service worker was added here instead of the end of the body in the html
// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

console.log(checkForName);

export {
    checkForName,
    handleSubmit
}
