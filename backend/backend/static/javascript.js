function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
function checkPass() {
    let fullname = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPass = document.getElementById("confrm-pass").value.trim();
    let message = document.getElementById("message");

    if (fullname.length === 0 || email.length === 0 || password.length === 0 || confirmPass.length === 0) {
        alert("Please fill in all fields");
        message.textContent = " ";
    } else if (password.length === 0) {
        alert("Password should not be empty!");
        message.textContent = " ";
    } else if (password === confirmPass) {
        // If all conditions are met, you can submit the form
        message.textContent = "Passwords Match";
        document.forms[0].submit();
    } else {
        message.textContent = "Password Mismatch";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        // Hash the password using bcrypt.js
        bcrypt.hash(password, 10, function(err, hashedPassword) {
            if (err) {
                console.error('Error hashing password:', err);
                return;
            }

            // Send email and hashed password to the backend
            fetch('http://your-django-backend.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: hashedPassword })
            })
            .then(response => {
                if (response.ok) {
                    // Login successful
                    alert('Login successful');
                    // Redirect to exthomepage
                    window.location.href = 'exthomepage.html';
                } else {
                    // Login failed
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in.');
            });
        });
    });
});



