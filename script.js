const btn = document.querySelector('#add-contact');
const contactForm = document.querySelector('form');
const contactList = document.getElementById('contact-list');

let pendingData = null;

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture the data from your specific IDs
    pendingData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value,
    };

    renderReviewCard();
    contactForm.classList.add('hidden'); // This hides the input fields
});

function renderReviewCard() {
    // We use innerHTML to inject the new buttons into the contact-list div
    contactList.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl border-t-4 border-purple-600 mt-4 animate-fade-in">
            <h3 class="text-xl font-bold text-purple-600 mb-4">Confirm Your Details</h3>
            <div class="text-gray-700 space-y-2 mb-6">
                <p><strong>Name:</strong> ${pendingData.name}</p>
                <p><strong>Email:</strong> ${pendingData.email}</p>
                <p><strong>Message:</strong> ${pendingData.message}</p>
            </div>
            
            <div class="flex flex-wrap gap-3">
                <button onclick="sendToEmailJS(event)" class="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition font-semibold">
                    Confirm & Send
                </button>
                <button onclick="editMessage()" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition font-semibold">
                    Edit
                </button>
                <button onclick="deleteMessage()" class="bg-red-100 text-red-600 px-6 py-2 rounded-full hover:bg-red-200 transition font-semibold">
                    Delete
                </button>
            </div>
        </div>
    `;
}

// Function to bring back the form for editing
window.editMessage = function() {
    contactForm.classList.remove('hidden');
    contactList.innerHTML = '';
};

// Function to clear everything
window.deleteMessage = function() {
    contactForm.classList.remove('hidden');
    contactForm.reset();
    contactList.innerHTML = '';
    pendingData = null;
};

// Final send function
window.sendToEmailJS = function(event) {
    event.target.innerText = "Sending...";
    
    const serviceID = 'service_5o5q7h4'; 
    const templateID = 'template_1heutht'; // Ensure this is your actual ID

    emailjs.send(serviceID, templateID, pendingData)
        .then(() => {
            contactList.innerHTML = `
                <div class="bg-green-100 p-8 rounded-lg text-center border border-green-300">
                    <h3 class="text-green-800 font-bold text-xl">🚀 Message Sent!</h3>
                    <p class="text-green-700 mt-2">I'll get back to you shortly.</p>
                    <button onclick="location.reload()" class="mt-4 text-purple-600 font-medium underline">Send another message</button>
                </div>
            `;
        }, (err) => {
            alert("Send failed. Please check your connection.");
            event.target.innerText = "Confirm & Send";
        });
};