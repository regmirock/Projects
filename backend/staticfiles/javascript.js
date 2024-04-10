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

