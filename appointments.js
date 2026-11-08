const appointmentForm = document.querySelector('#appointment-request-form');
const appointmentStatus = document.querySelector('#appointment-status');

appointmentForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!appointmentForm.reportValidity()) return;

  const fields = new FormData(appointmentForm);
  const subject = `Sita Ram Prasad Memorial Trust Hospital appointment request: ${fields.get('department')}`;
  const body = [
    `Department or speciality: ${fields.get('department')}`,
    `Preferred doctor: ${fields.get('doctor')}`,
    `Preferred date: ${fields.get('date')}`,
    `Preferred time: ${fields.get('time')}`,
    `Full name: ${fields.get('fullName')}`,
    `Age or date of birth: ${fields.get('ageOrDob')}`,
    `Phone number: ${fields.get('phone')}`,
    `Email: ${fields.get('email')}`,
    `Visit type: ${fields.get('visitType')}`,
    `Contact preference: ${fields.get('contactPreference')}`,
    '',
    fields.get('reason'),
  ].join('\n');
  // No backend yet. Follows contact.js: opens a mailto draft with no recipient set.
  // Add the hospital's confirmed inbox (or wire a real endpoint) when supplied.
  const inbox = '';
  appointmentStatus.textContent = "We've received your request. We'll contact you shortly to confirm a time. This is a request, not a confirmed booking.";
  window.location.href = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
