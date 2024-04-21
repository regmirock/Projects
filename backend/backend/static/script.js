document.addEventListener('DOMContentLoaded', function() {
    const passGenLink = document.getElementById('passGenLink');
    const savePassLink = document.getElementById('savePassLink');
    const vaultLink = document.getElementById('vaultLink');
    const profileLink = document.getElementById('profileLink');

    passGenLink.addEventListener('click', function() {
        showSection('PassGenSec');
    });

    savePassLink.addEventListener('click', function() {
        showSection('SavePass-form');
    });

    vaultLink.addEventListener('click', function() {
        showSection('VaultSec');
    });

    profileLink.addEventListener('click', function() {
        showSection('ProfileSec');
    });
});

function showSection(sectionId) {
    // Hide all sections
    const allSections = document.querySelectorAll('.content section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.querySelector('#PassGenSec button');
    const passwordInput = document.querySelector('#password');

    generateButton.addEventListener('click', function() {
        const length = 10; // Length of the generated password
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"; // Characters to include in the password
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordInput.value = password;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copyButton").addEventListener("click", copyPassword);
});

function copyPassword() {
    var password = document.getElementById("password").value;
    if (!password) {
        alert("No password generated yet!");
        return;
    }
    navigator.clipboard.writeText(password)
        .then(function() {
            alert("Password copied to clipboard!");
        })
        .catch(function(err) {
            console.error('Unable to copy password: ', err);
        });
}




// login.js

//document.getElementById("login-form").addEventListener("submit", function(event) {
   // event.preventDefault();
    //submitForm();
//});

async function getPasswordHash(password) {
    const response = await fetch("/get_password_hash", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ password: password })
    });

    const data = await response.json();
    return data.password_hash;
}

async function submitForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Get hashed password
    var hashedPassword = await getPasswordHash(password);

    // Submit form with hashed password
    var form = document.getElementById("login-form");
    var formData = new FormData(form);
    formData.set("password", hashedPassword);

    fetch("/user_login", {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "exthomepage.html"; // Redirect to homepage
        } else {
            alert(data.error_message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });



    
    function copyText(elementId) {
        var text = document.getElementById(elementId).innerText;
    
        // Use the Clipboard API to copy text to the clipboard
        navigator.clipboard.writeText(text)
            .then(function() {
                // Success callback
                console.log("Text copied to clipboard:", text);
                alert("Text copied to clipboard!");
            })
            .catch(function(error) {
                // Error callback
                console.error("Failed to copy text: ", error);
                alert("Failed to copy text. Please try again.");
            });
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Select all copy buttons by their IDs
    var copyUsernameButtons = document.querySelectorAll("[id^='copyUsernameButton_']");
    var copyPasswordButtons = document.querySelectorAll("[id^='copyPasswordButton_']");

    // Add click event listeners to copy username and password
    copyUsernameButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var id = this.id.split("_")[1]; // Extract the unique identifier
            copyText("username_" + id);
        });
    });

    copyPasswordButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var id = this.id.split("_")[1]; // Extract the unique identifier
            copyText("password_" + id);
        });
    });
});

function copyText(elementId) {
    var text = document.getElementById(elementId).innerText;

    // Use the Clipboard API to copy text to the clipboard
    navigator.clipboard.writeText(text)
        .then(function() {
            // Success callback
            console.log("Text copied to clipboard:", text);
            alert("Text copied to clipboard!");
        })
        .catch(function(error) {
            // Error callback
            console.error("Failed to copy text: ", error);
            alert("Failed to copy text. Please try again.");
        });
}
function checkCredentials() {
    // Get the values of input fields
    let site = document.getElementById("Site").value.trim();
    let username = document.getElementById("Username").value.trim();
    let password = document.getElementById("Password").value.trim();

    // Check if any field is empty
    if (site === "" || username === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Check if password meets the minimum length requirement
    if (password.length < 8) {
        alert("Password should be at least 8 characters long.");
        return false;
    }

    // All validations pass, allow form submission
    return true;
}


