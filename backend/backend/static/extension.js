document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        login(email, password);
    });
});


function login(email, password) {
    fetch('http://localhost:8000/api/login/', {  // Replace with your actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        if (data.status === 'success') {
            console.log('Login successful:', data.message);
            // Handle successful login here
        } else {
            console.log('Login failed:', data.message);
            // Handle login failure here
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
}

