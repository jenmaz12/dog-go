$(document).ready(() => {
  // Getting references to the name input and author container, as well as the table body
  const timeInput = $('#appoint-time');
  const appointmentList = $('tbody');
  const AppointmentContainer = $('.appointment-container');
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on('submit', '#appoint-form', handleAppointmentFormSubmit);
  $(document).on('click', '.delete-appoint', handleDeleteButtonPress);
  // Getting the initial list of Walkers
  getAppointments();
  // A function to handle what happens when the form is submitted to create a new Author
  function handleAppointmentFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!timeInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAppointment({
      time: timeInput
        .val()
        .trim(),
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAppointment(appointmentData) {
    $.post('/api/appointments', appointmentData)
      .then(getAppointments);
  }

  // Function for creating a new list row for authors
  function createAppointmentRow(appointmentData) {
    const newTr = $('<tr>');
    newTr.data('appointment', appointmentData);
    newTr.append(`<td>${appointmentData.name}</td>`);
    newTr.append(`<td><a href='/blog?appointment_id=${appointmentData.id}'>Go to Appointments</a></td>`);
    newTr.append(`<td><a href='/cms?appointment_id=${appointmentData.id}'>Create a ?</a></td>`);
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-appointment'>Delete Appointment</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getAppointments() {
    $.get('/api/appointments', (data) => {
      const rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createAppointmentRow(data[i]));
      }
      renderAppointmentList(rowsToAdd);
      timeInput.val('');
    });
  }

  // A function for rendering the list of authors to the page
  function renderAppointmentList(rows) {
    appointmentList.children().not(':last').remove();
    AppointmentContainer.children('.alert').remove();
    if (rows.length) {
      console.log(rows);
      appointmentList.prepend(rows);
    } else {
      renderEmpty();
    }
  }
  // Function for handling what to render when there are no authors
  function renderEmpty() {
    const alertDiv = $('<div>');
    alertDiv.addClass('alert alert-danger');
    alertDiv.text('You must create an Customer before you can create an Appointment.');
    AppointmentContainer.append(alertDiv);
  }
  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    const listItemData = $(this).parent('td').parent('tr').data('customer');
    const id = listItemData.id;
    $.ajax({
      method: 'DELETE',
      url: `/api/appointments/${id}`,
    })
      .then(getAppointments);
  }
});
