const btn = document.querySelector('#contact-form button');

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  btn.innerText = 'Sending...';

  const serviceID = 'service_5o5q7h4';   // Replace with your Service ID
  const templateID = 'template_1heutht'; // Replace with your Template ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.innerText = 'Send Message';
      
      // Display info on the page
      const name = document.getElementById('contact-name').value;
      const message = document.getElementById('contact-message').value;
      
      const contactList = document.getElementById('contact-list');
      contactList.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500 animate-pulse">
          <h3 class="text-lg font-bold text-purple-600">Thanks, ${name}!</h3>
          <p class="text-gray-600">Your message has been sent to my inbox.</p>
          <p class="mt-2 italic text-sm text-gray-500">"${message}"</p>
        </div>
      `;

      this.reset(); // Clear form fields
    }, (err) => {
      btn.innerText = 'Send Message';
      alert(JSON.stringify(err));
    });
});