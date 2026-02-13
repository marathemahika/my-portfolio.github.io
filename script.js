const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

// Render contacts
function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        const div = document.createElement("div");
        div.className = "p-4 bg-gray-100 rounded-lg";

        div.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>

            <div class="mt-3 space-x-2">
                <button onclick="editContact(${index})"
                    class="px-3 py-1 bg-yellow-400 rounded">
                    Edit
                </button>

                <button onclick="deleteContact(${index})"
                    class="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                </button>
            </div>
        `;

        contactList.appendChild(div);
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Add or Update Contact
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("All fields are required.");
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

// Delete
function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}

// Edit
function editContact(index) {
    const contact = contacts[index];

    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;

    editIndex = index;
}

// Load contacts on page open
renderContacts();
