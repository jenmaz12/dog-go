
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = document.getElementById('year');
const selectMonth = document.getElementById('month');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);


function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  const firstDay = (new Date(year, month)).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  const tbl = document.getElementById('calendar-body'); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = '';

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = `${months[month]} ${year}`;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    const row = document.createElement('tr');

    // creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      // Fills the empty spaces
      if (i === 0 && j < firstDay) {
        const cell = document.createElement('td');
        // let cellText = document.createElement(" ");
        // cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        // Creates the date
        // <td align='center'><form><input type=submit value="click me" style="width:100%"></form></td>
        const cell = document.createElement('td');
        const cellBtn = document.createElement('btn');
        $(cellBtn).addClass('btn btn-link');
        const cellText = document.createTextNode(date);
        $(cellBtn).attr('data-date', date);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add('bg-info');
        } // Creating the button
        cellBtn.appendChild(cellText);
        cell.appendChild(cellBtn);
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row); // appending each row into calendar body.
  }
  $('.btn').click(function () {
    // THIS IS THE PROBLEM
    const btnValue = $(this).attr('data-date');
    // btnValue = parseInt(btnValue);
    console.log(btnValue);
    // Correct the month number from index
    currentMonth++;
    let monthSyntax;
    let btnSyntax;
    if (currentMonth < 10) {
      monthSyntax = (`0${currentMonth}`);
    } else {
      monthSyntax = currentMonth;
    }

    if (btnValue < 10) {
      btnSyntax = (`0${btnValue}`);
    } else {
      btnSyntax = btnValue;
    }

    const thisDate = `${currentYear}-${monthSyntax}-${btnSyntax}`;
    console.log(thisDate);

    // create half hour appts 9 to 5 on this date
    createIncrements(`${thisDate} 09:00`);
  });
}
let increments = [];
function createIncrements(startTime) {
  increments = [];
  moment().format('MMMM Do YYYY, h:mm:ss a');
  const moStart = moment(startTime);
  increments.push(moStart);
  for (let i = 0; i < 16; i++) {
    increments.push(moment(moStart.add(30, 'm').format('MMMM Do YYYY, h:mm:ss a')));
  }
  console.log(increments);
}

function showAppointments(day) {
  // const startRange;
  // const endRange;
  // const timeRange =
  // $.get(`/api/appointments/${day}`, (data) => {
  //   bookedAppts.push(data);
  //   console.log(bookedAppts);
  // });

}
// pull all appointments from appointments table that match the date
// store in a local variable
// run for loop with conditional to populate the modal with timeslot buttons
// conditional checks to see if the appointment exists in the appointments table
// if exists, don't create the button - continue javascript statement
