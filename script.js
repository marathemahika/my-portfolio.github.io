const btn = document.querySelector('#add-contact');
const contactForm = document.querySelector('form');
const contactList = document.getElementById('contact-list');

// We store the data globally so we can edit it
let pendingData = null;

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Capture the data
    pendingData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value,
    };

    renderReviewCard();
    contactForm.classList.add('hidden'); // Hide form while reviewing
});

function renderReviewCard() {
    contactList.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600 animate-fade-in">
            <h3 class="text-xl font-bold text-purple-600 mb-4">Review Your Message</h3>
            <p><strong>Name:</strong> ${pendingData.name}</p>
            <p><strong>Email:</strong> ${pendingData.email}</p>
            <p class="mb-4"><strong>Message:</strong> ${pendingData.message}</p>
            
            <div class="flex gap-4">
                <button onclick="sendToEmailJS()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Confirm & Send</button>
                <button onclick="editMessage()" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400">Edit</button>
                <button onclick="deleteMessage()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">Delete</button>
            </div>
        </div>
    `;
}

window.editMessage = function() {
    contactForm.classList.remove('hidden');
    contactList.innerHTML = '';
    // Values stay in the input fields naturally
};

window.deleteMessage = function() {
    contactForm.classList.remove('hidden');
    contactForm.reset();
    contactList.innerHTML = '';
    pendingData = null;
};

window.sendToEmailJS = function() {
    const confirmBtn = event.target;
    confirmBtn.innerText = "Sending...";
    
    const serviceID = 'service_5o5q7h4'; 
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your ID

    emailjs.send(serviceID, templateID, pendingData)
        .then(() => {
            contactList.innerHTML = `
                <div class="bg-green-100 p-6 rounded-lg text-center border border-green-500">
                    <h3 class="text-green-700 font-bold text-lg">Message Sent Successfully!</h3>
                    <button onclick="location.reload()" class="mt-4 text-purple-600 underline">Send another?</button>
                </div>
            `;
        }, (err) => {
            alert("Send failed: " + JSON.stringify(err));
        });
};