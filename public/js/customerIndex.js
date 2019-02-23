$(document).ready(() => {
  // Getting references to the name input and author container, as well as the table body
  const nameInput = $('#customerName');
  const newPetName = $('#petName');
  const newEmail = $('#email');
  const newPhoneNumber = $('#number');
  // const customerList = $('tbody');
  // const CustomerContainer = $('.customer-container');

  // Adding event listeners to the form to create a new object, and the button to delete a customer
  $(document).on('click', '#customer-form', handleCustomerFormSubmit);
  // $(document).on('click', '#delete-customer', handleDeleteButtonPress);


  // A function to handle what happens when the form is submitted to create a new Author
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
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
        .then(console.log(newCustomer));
    }
  }

  // Function for creating a new list row for authors
  // function createCustomerRow(customerData) {
  //   const newTr = $('<tr>');
  //   newTr.data('customer', customerData);
  //   newTr.append(`<td>${customerData.name}</td>`);
  //   newTr.append(`<td><a href='/blog?customer_id=${customerData.id}'>Go to Appointments</a></td>`);
  //   newTr.append(`<td><a href='/cms?customer_id=${customerData.id}'>Create a Customer</a></td>`);
  //   newTr.append("<td><a style='cursor:pointer;color:red' class='delete-customer'>Delete Customer</a></td>");
  //   return newTr;
  // }

  // Function for retrieving authors and getting them ready to be rendered to the page
  // function getCustomers() {
  //   $.get('/api/customer', (data) => {
  //     const rowsToAdd = [];
  //     for (let i = 0; i < data.length; i++) {
  //       rowsToAdd.push(createCustomerRow(data[i]));
  //     }
  //     renderCustomerList(rowsToAdd);
  //     nameInput.val('');
  //   });
  // }

  // A function for rendering the list of authors to the page
  // function renderCustomerList(rows) {
  //   customerList.children().not(':last').remove();
  //   CustomerContainer.children('.alert').remove();
  //   if (rows.length) {
  //     console.log(rows);
  //     customerList.prepend(rows);
  //   } else {
  //     renderEmpty();
  //   }
  // }
  // Function for handling what to render when there are no authors
  // function renderEmpty() {
  //   const alertDiv = $('<div>');
  //   alertDiv.addClass('alert alert-danger');
  //   alertDiv.text('You must create an Customer before you can create an Appointment.');
  //   CustomerContainer.append(alertDiv);
  // }
  // Function for handling what happens when the delete button is pressed
  // function handleDeleteButtonPress() {
  //   const listItemData = $(this).parent('td').parent('tr').data('customer');
  //   const id = listItemData.id;
  //   $.ajax({
  //     method: 'DELETE',
  //     url: `/api/customers/${id}`,
  //   })
  //     .then(getCustomers);
  // }
});
