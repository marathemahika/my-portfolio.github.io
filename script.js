const form = document.querySelector("#contact form");
const nameInput = form.querySelector("input[type='text']");
const emailInput = form.querySelector("input[type='email']");
const messageInput = form.querySelector("textarea");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("All fields are required.");
    return;
  }

  const newContact = { name, email, message };
  contacts.push(newContact);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";

  alert("Message stored successfully.");
});
