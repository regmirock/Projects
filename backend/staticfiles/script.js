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
document.getElementById("copyButton").addEventListener("click", copyPassword);


// login.js

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    submitForm();
});

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
}





