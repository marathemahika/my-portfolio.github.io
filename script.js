const form = document.getElementById("contactForm");
const messageList = document.getElementById("messageList");

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Render messages
function renderMessages() {
    messageList.innerHTML = "";

    messages.forEach((msg, index) => {
        const div = document.createElement("div");
        div.className = "border p-4 rounded-lg bg-gray-100";

        div.innerHTML = `
            <p><strong>Name:</strong> ${msg.name}</p>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
            <button onclick="deleteMessage(${index})"
                class="mt-2 text-red-600 font-semibold">
                Delete
            </button>
        `;

        messageList.appendChild(div);
    });
}

// Handle form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
    }

    const newMessage = { name, email, message };
    messages.push(newMessage);

    localStorage.setItem("messages", JSON.stringify(messages));

    renderMessages();
    form.reset();
});

// Delete message
function deleteMessage(index) {
    messages.splice(index, 1);
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
}

// Initial render
renderMessages();
