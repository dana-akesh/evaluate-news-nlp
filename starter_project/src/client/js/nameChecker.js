function checkForName(inputText) {
    console.log("Running url checking******", inputText);
    try {
        new URL(inputText);
        return true;
    } catch (error) {
        alert('enter a valid URL');
        return false;
    }
}

export { checkForName };
