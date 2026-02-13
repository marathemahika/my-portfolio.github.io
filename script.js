const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

// Render contacts to screen
function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        const div = document.createElement("div");
        div.className = "p-3 bg-gray-200 rounded";

        div.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <button onclick="editContact(${index})"
                class="mt-2 mr-2 bg-yellow-400 px-3 py-1 rounded">
                Edit
            </button>
            <button onclick="deleteContact(${index})"
                class="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                Delete
            </button>
        `;

        contactList.appendChild(div);
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Add or update contact
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill all fields.");
        return;
    }

    const newContact = { name, email, phone };

    if (editIndex === null) {
        contacts.push(newContact);
    } else {
        contacts[editIndex] = newContact;
        editIndex = null;
    }

    form.reset();
    renderContacts();
});

// Delete function
function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}

// Edit function
function editContact(index) {
    const contact = contacts[index];

    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;

    editIndex = index;
}

// Load contacts when page opens
renderContacts();
