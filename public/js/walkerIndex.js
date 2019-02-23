$(document).ready(() => {
  // Getting references to the name input and author container, as well as the table body
  const nameInput = $('#walker-name');
  const walkerList = $('tbody');
  const walkerContainer = $('.walker-container');
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on('submit', '#walker-form', handleWalkerFormSubmit);
  $(document).on('click', '.delete-walker', handleDeleteButtonPress);

  // Getting the initial list of Walkers
  getWalkers();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleWalkerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertWalker({
      name: nameInput
        .val()
        .trim(),
    });
  }

  // A function for creating an walker. Calls getAuthors upon completion
  function upsertWalker(walkerData) {
    $.post('/api/authors', walkerData)
      .then(getWalkers);
  }

  // Function for creating a new list row for authors
  function createWalkerRow(walkerData) {
    const newTr = $('<tr>');
    newTr.data('walker', walkerData);
    newTr.append(`<td>${walkerData.name}</td>`);
    // show appointments where this walker is the walker
    newTr.append(`<td><a href='/blog?author_id=${walkerData.id}'>Go to Appointments</a></td>`);
    // schedule an appointment with this walker
    newTr.append(`<td><a href='/cms?author_id=${walkerData.id}'>Create an Appointment with this Walker</a></td>`);
    // remove walker from walker list
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Walker</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getWalkers() {
    $.get('/api/walkers', (data) => {
      const rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createWalkerRow(data[i]));
      }
      renderWalkerList(rowsToAdd);
      nameInput.val('');
    });
  }

  // A function for rendering the list of authors to the page
  function renderWalkerList(rows) {
    walkerList.children().not(':last').remove();
    walkerContainer.children('.alert').remove();
    if (rows.length) {
      console.log(rows);
      walkerList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    const alertDiv = $('<div>');
    alertDiv.addClass('alert alert-danger');
    alertDiv.text('You must create an Author before you can create a Post.');
    walkerContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    const listItemData = $(this).parent('td').parent('tr').data('walker');
    const id = listItemData.id;
    $.ajax({
      method: 'DELETE',
      url: `/api/authors/${id}`,
    })
      .then(getWalkers);
  }
});
