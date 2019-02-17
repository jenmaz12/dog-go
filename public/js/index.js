$(document).ready(() => {
  // Get references to page elements
  const appointmentDate = $('#appointment-date');
  const appointmentTime = $('#appointment-time');
  const $submitBtn = $('#submit');
  const appointmentList = $('#appointment-list');

  // The API object contains methods for each kind of request we'll make
  const API = {
    saveAppointment(appointment) {
      return $.ajax({
        headers: {
          'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'api/appointments',
        data: JSON.stringify(appointment),
      });
    },
    getAppointments() {
      return $.ajax({
        url: 'api/appointments',
        type: 'GET',
      });
    },
    deleteExample(id) {
      return $.ajax({
        url: `api/appointments/${id}`,
        type: 'DELETE',
      });
    },
  };

  // refreshExamples gets new appointments from the db and repopulates the list
  const refreshAppointments = function () {
    API.getAppointments().then((data) => {
      const appointments = data.map((appointment) => {
        const $a = $('<a>')
          .text(appointment.time)
          .attr('href', `/appointment/${appointment.id}`);

        const $li = $('<li>')
          .attr({
            class: 'list-group-item',
            'data-id': appointment.id,
          })
          .append($a);

        const $button = $('<button>')
          .addClass('btn btn-danger float-right delete')
          .text('ｘ');

        $li.append($button);

        return $li;
      });

      appointmentList.empty();
      appointmentList.append(appointments);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  const handleFormSubmit = function (event) {
    event.preventDefault();

    const appointment = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim(),
    };

    if (!(example.text && example.description)) {
      alert('You must enter an example text and description!');
      return;
    }

    API.saveExample(example).then(() => {
      refreshExamples();
    });

    $exampleText.val('');
    $exampleDescription.val('');
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  const handleDeleteBtnClick = function () {
    const idToDelete = $(this)
      .parent()
      .attr('data-id');

    API.deleteExample(idToDelete).then(() => {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on('click', handleFormSubmit);
  $exampleList.on('click', '.delete', handleDeleteBtnClick);

});
