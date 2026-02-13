// ===== Contact Manager =====

// Select elements
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const phoneInput = document.getElementById("contact-phone");
const addBtn = document.getElementById("add-contact");
const contactList = document.getElementById("contact-list");
const searchInput = document.getElementById("search-contact");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Render contacts
function renderContacts(filter = "") {
  contactList.innerHTML = "";

  contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((contact, index) => {
      const li = document.createElement("li");
      li.className =
        "bg-white p-4 mb-3 rounded-lg shadow flex justify-between items-center";
      li.setAttribute("draggable", true);
      li.dataset.index = index;

      li.innerHTML = `
        <div>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
        </div>
        <div class="space-x-2">
          <button class="edit-btn bg-yellow-400 px-3 py-1 rounded text-white">Edit</button>
          <button class="delete-btn bg-red-500 px-3 py-1 rounded text-white">Delete</button>
        </div>
      `;

      // Delete
      li.querySelector(".delete-btn").addEventListener("click", () => {
        contacts.splice(index, 1);
        saveToStorage();
        renderContacts(searchInput.value);
      });

      // Edit
      li.querySelector(".edit-btn").addEventListener("click", () => {
        nameInput.value = contact.name;
        emailInput.value = contact.email;
        phoneInput.value = contact.phone;
        editIndex = index;
        addBtn.textContent = "Update Contact";
      });

      contactList.appendChild(li);
    });
}

// Add / Update Contact
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert("All fields are required.");
    return;
  }

  const contactData = { name, email, phone };

  if (editIndex !== null) {
    contacts[editIndex] = contactData;
    editIndex = null;
    addBtn.textContent = "Add Contact";
  } else {
    contacts.push(contactData);
  }

  saveToStorage();
  renderContacts(searchInput.value);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});

// Search Feature
searchInput.addEventListener("input", () => {
  renderContacts(searchInput.value);
});

// Drag and Drop Reordering
let draggedIndex = null;

contactList.addEventListener("dragstart", (e) => {
  draggedIndex = e.target.dataset.index;
});

contactList.addEventListener("dragover", (e) => {
  e.preventDefault();
});

contactList.addEventListener("drop", (e) => {
  e.preventDefault();
  const targetIndex = e.target.closest("li").dataset.index;

  if (draggedIndex !== null && targetIndex !== null) {
    const draggedItem = contacts.splice(draggedIndex, 1)[0];
    contacts.splice(targetIndex, 0, draggedItem);

    saveToStorage();
    renderContacts(searchInput.value);
  }

  draggedIndex = null;
});

// Initial Render
renderContacts();
