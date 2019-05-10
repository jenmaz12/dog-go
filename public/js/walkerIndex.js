// import { keyframes } from 'popmotion';

$(document).ready(() => {
  let newWalker;

  // Adding event listeners to the form to create a new object, and the button to delete a customer
  // $(document).on('click', '#walker-form', handleWalkerFormSubmit());
  $('#walker-form').on('click', (event) => {
    event.preventDefault();
    newWalker = {
      name: $('#walkerName').val().trim(),
      email: $('#walkerEmail').val().trim(),
      phoneNumber: $('#walkerNumber').val().trim(),
    };
    $.post('/api/walkers', newWalker).then((data) => {
      console.log(data);
      $.get('api/walkers', (data2) => {
        console.log(data2);
        const walkerTable = document.getElementById('walkerTable');
        $(walkerTable).empty();
        for (let i = 0; i < data2.length; i++) {
          const row = document.createElement('tr');
          Object.keys(data2[i]).forEach((key) => {
            // key: the name of the object key
            // index: the ordinal position of the key within the object
            const cell = document.createElement('td');
            const cellText = document.createTextNode(data2[i][key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          });
          walkerTable.appendChild(row);
        }
        // if ($('.table').style.display === 'none') {
        //   $('.table').style.display = 'block';
        // }
      });
    });
    const frm = document.getElementsByName('walkerId-form')[0];
    frm.reset();
  });
});

// A function to handle what happens when the form is submitted to create a new Author
// function handleWalkerFormSubmit() {
//   console.log('clicked!');
//   upsertWalker(
//     {
//       name: walkerNameInput,
//       email: newWalkerEmail,
//       phoneNumber: newWalkerPhoneNumber,
//     },
//   );
// }

// // A function for creating an author. Calls getAuthors upon completion
// function upsertWalker(newWalker) {
//   $.post('/api/walkers', newWalker, (data1) => {
//     console.log(data1);
//     $.get('api/walkers', (data) => {
//       console.log(data);
//     });
//   });
// }
// // Function for handling what to render when there are no authors
// function renderEmpty() {
//   const alertDiv = $('<div>');
//   alertDiv.addClass('alert alert-danger');
//   alertDiv.text('You must enter your information to become a dog walker.');
//   walkerContainer.append(alertDiv);
// }
