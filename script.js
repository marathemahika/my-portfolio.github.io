const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const phoneInput = document.getElementById("contact-phone");
const addBtn = document.getElementById("add-contact");
const contactList = document.getElementById("contact-list");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center";

    card.innerHTML = `
      <div>
        <p class="font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">${contact.email}</p>
        <p class="text-sm text-gray-600">${contact.phone}</p>
      </div>
      <div class="space-x-3">
        <button class="edit text-purple-600 font-medium">Edit</button>
        <button class="delete text-red-500 font-medium">Delete</button>
      </div>
    `;

    // Delete
    card.querySelector(".delete").addEventListener("click", () => {
      contacts.splice(index, 1);
      saveContacts();
      renderContacts();
    });

    // Edit
    card.querySelector(".edit").addEventListener("click", () => {
      nameInput.value = contact.name;
      emailInput.value = contact.email;
      phoneInput.value = contact.phone;
      editIndex = index;
      addBtn.textContent = "Update Contact";
    });

    contactList.appendChild(card);
  });
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert("All fields are required.");
    return;
  }

  const newContact = { name, email, phone };

  if (editIndex !== null) {
    contacts[editIndex] = newContact;
    editIndex = null;
    addBtn.textContent = "Add Contact";
  } else {
    contacts.push(newContact);
  }

  saveContacts();
  renderContacts();

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});

renderContacts();
