import { checkForName } from './nameChecker';

function handleSubmit(event) {
    event.preventDefault();

    // Get input value
    const formText = document.getElementById("name").value;

    // Call validation function from nameChecker.js
    if (checkForName(formText)) {
        console.log("Validation successful. ::: Form Submitted :::");

        // Prepare data for API call
        const data = {
            theText: formText,
        };

        // Make POST request
        fetch("http://localhost:8080/testing", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((res) => {
                document.getElementById("results").innerHTML = res.text;
            });
    } else {
        console.log("Validation failed. Submission aborted.");
    }
}

export { handleSubmit };
