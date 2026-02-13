// Get elements
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

// Listen for form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
    }

    // Email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Simulate form submission
    successMessage.classList.remove("hidden");

    // Reset form
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.add("hidden");
    }, 3000);
});
