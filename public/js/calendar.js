
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
        $(cellBtn).addClass('btn btn-link dayBtn');
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
  $('.dayBtn').click(function () {
    // THIS IS THE PROBLEM
    const btnValue = $(this).attr('data-date');
    // btnValue = parseInt(btnValue);
    console.log(btnValue);
    // Correct the month number from index
    let monthSyntax;
    let btnSyntax;
    if (currentMonth + 1 < 10) {
      monthSyntax = (`0${currentMonth + 1}`);
    } else {
      monthSyntax = currentMonth + 1;
    }

    if (btnValue < 10) {
      btnSyntax = (`0${btnValue}`);
    } else {
      btnSyntax = btnValue;
    }

    const thisDate = `${currentYear}-${monthSyntax}-${btnSyntax}`;
    console.log(thisDate);

    // create half hour appts 9 to 5 on this date
    createIncrements(`${thisDate} 09:00:00`);
    // compare increments to appointments on this date and only show ones that are not in the db
    showAppointments(thisDate);
  });
}
let increments = [];
function createIncrements(startTime) {
  increments = [];
  // eslint-disable-next-line no-undef
  moment().format('YYYY-MM-DD HH:mm:ss');
  // eslint-disable-next-line no-undef
  const moStart = moment(startTime);
  increments.push(moStart);
  for (let i = 0; i < 16; i++) {
    // creates a new moment for each 30 min timeslot because .add does not change moStart
    // pushes to increments array
    // eslint-disable-next-line no-undef
    increments.push(moment(moStart.add(30, 'm').format('YYYY-MM-DD HH:mm:ss')));
  }
}

function showAppointments(day) {
  const bookedAppts = [];
  const availableAppts = [];
  $.get(`/api/appointments/${day}`, (data) => {
    for (let i = 0; i < data.length; i++) {
      bookedAppts.push(`${data[i].date} ${data[i].startTime}`);
    }
    for (let j = 0; j < increments.length; j++) {
      if (bookedAppts.indexOf(increments[j]._i) === -1) {
        availableAppts.push(increments[j]._i);
      }
    }
    console.log(availableAppts);
  });
}
// pull all appointments from appointments table that match the date
// store in a local variable
// run for loop with conditional to populate the modal with timeslot buttons
// conditional checks to see if the appointment exists in the appointments table
// if exists, don't create the button - continue javascript statement
