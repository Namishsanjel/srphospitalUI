const contactForm = document.querySelector('#contact-message-form');
const contactStatus = document.querySelector('#form-status');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const fields = new FormData(contactForm);
  const fullName = `${fields.get('firstName')} ${fields.get('lastName')}`.trim();
  const subject = `Sita Ram Prasad Memorial Trust Hospital enquiry: ${fields.get('topic')}`;
  const body = [
    `Name: ${fullName}`,
    `Email: ${fields.get('email')}`,
    `Topic: ${fields.get('topic')}`,
    '',
    fields.get('message'),
  ].join('\n');
  const inbox = ''; // Add the hospital's confirmed email address when supplied.
  contactStatus.textContent = 'Your email app will open a draft. The hospital’s email address is awaiting confirmation; add the confirmed recipient before sending. No message has been sent.';
  window.location.href = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
