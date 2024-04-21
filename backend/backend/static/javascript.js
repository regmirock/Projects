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

    // Regular expression to match special characters
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (fullname.length === 0 || email.length === 0 || password.length === 0 || confirmPass.length === 0) {
        alert("Please fill in all fields");
        message.textContent = " ";
    } else if (password.length < 8) {
        alert("Password should be at least 8 characters long");
        message.textContent = " ";
    } else if (!specialCharacters.test(password)) {
        alert("Password should contain at least one special character like @, _, %, or &");
        message.textContent = " ";
    } else if (password === confirmPass) {
        // If all conditions are met, you can submit the form
        message.textContent = "Passwords Match";
        document.forms[0].submit();
    } else {
        message.textContent = "Password Mismatch";
    }
}
// reset_form.js

function checkPassword() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    // Regular expression to match special characters
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (email.length === 0 || password.length === 0) {
        errorMessage.textContent = "Please fill in all fields";
        return false;
    }

    if (password.length < 8) {
        errorMessage.textContent = "Password should be at least 8 characters long";
        return false;
    }

    if (!specialCharacters.test(password)) {
        errorMessage.textContent = "Password should contain at least one special character like @, _, %, or &";
        return false;
    }

    // If all validations pass, allow the form submission
    return true;
}









