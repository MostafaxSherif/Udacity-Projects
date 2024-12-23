function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    // Validation rules
    const isEmpty = inputText.trim() === "";
    const hasInvalidChars = /[^a-zA-Z\s]/.test(inputText);

    if (isEmpty) {
        alert("Input cannot be empty. Please provide a valid name.");
        return false;
    }

    if (hasInvalidChars) {
        alert("Input contains invalid characters. Only letters and spaces are allowed.");
        return false;
    }

    const predefinedNames = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];
    if (!predefinedNames.includes(inputText)) {
        alert("Name not recognized. Please enter a valid captain name.");
        return false;
    }

    return true; // Input passes all validations
}

export { checkForName };
