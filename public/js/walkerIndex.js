$(document).ready(() => {
  // Getting references to the name input and author container, as well as the table body
  const walkerNameInput = $('#walkerName');
  const newWalkerEmail = $('#walkerEmail');
  const newWalkerPhoneNumber = $('#walkerNumber');
  const walkerContainer = $('#walker-container');
  const url = ('/calendar');

  // Adding event listeners to the form to create a new object, and the button to delete a customer
  $(document).on('click', '#walker-form', handleWalkerFormSubmit);


  // A function to handle what happens when the form is submitted to create a new Author
  function handleWalkerFormSubmit(event) {
    event.preventDefault();
    console.log('clicked!');
    if (!walkerNameInput.val()) {
      renderEmpty();
    }
    // show appointments
    showSchedule();
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertWalker(
      {
        name: walkerNameInput.val(),
        email: newWalkerEmail.val(),
        phoneNumber: newWalkerPhoneNumber.val(),
      },
    );

    // A function for creating an author. Calls getAuthors upon completion
    function upsertWalker(newWalker) {
      $.post('/api/walkers', newWalker)
      // this will change
        .then(window.location = url);
    }

    // Function for handling what to render when there are no authors
    function renderEmpty() {
      const alertDiv = $('<div>');
      alertDiv.addClass('alert alert-danger');
      alertDiv.text('You must create a Walker before you can create a Schedule.');
      walkerContainer.append(alertDiv);
    }

    function showSchedule() {
      const newDiv = $('<div>');
      newDiv.text('You are now Available for these times!');
      // this will change
      walkerContainer.append(newDiv);
    }
  }
});
