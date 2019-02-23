$(document).ready(() => {
  // Getting references to the name input and author container, as well as the table body
  const nameInput = $('#customerName');
  const newPetName = $('#petName');
  const newEmail = $('#email');
  const newPhoneNumber = $('#number');
  // const customerList = $('tbody');
  const CustomerContainer = $('#customer-container');
  const url = ('/calendar');

  // Adding event listeners to the form to create a new object, and the button to delete a customer
  $(document).on('click', '#customer-form', handleCustomerFormSubmit);


  // A function to handle what happens when the form is submitted to create a new Author
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
    if (!nameInput.val()) {
      renderEmpty();
    }
    // show appointments
    showAppointments();
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertCustomer(
      {
        name: nameInput.val(),
        petName: newPetName.val(),
        email: newEmail.val(),
        phoneNumber: newPhoneNumber.val(),
      },
    );

    // A function for creating an author. Calls getAuthors upon completion
    function upsertCustomer(newCustomer) {
      $.post('/api/customers', newCustomer)
      // this will change
        .then(window.location = url);
    }

    // Function for handling what to render when there are no authors
    function renderEmpty() {
      const alertDiv = $('<div>');
      alertDiv.addClass('alert alert-danger');
      alertDiv.text('You must create an Customer before you can create an Appointment.');
      CustomerContainer.append(alertDiv);
    }

    function showAppointments() {
      const newDiv = $('<div>');
      newDiv.text('Customer:');
      newDiv.text(nameInput.val());
      // this will change
      CustomerContainer.append(newDiv);
    }
  }
});
