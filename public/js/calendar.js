
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
    const btnValue = $(this).attr('data-date');

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
let increments;
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
let bookedAppts = [];
function showAppointments(day) {
  // create arrays for booked, available, and walkers
  bookedAppts = [];
  const availableAppts = [];
  const walkers = [];
  // get walkers from db and push into walkers array
  $.get('api/walkers', (data) => {
    walkers.push(data);
    console.log(walkers);
    $.get(`/api/appointments/${day}`, (data2) => {
      for (let i = 0; i < data2.length; i++) {
        bookedAppts.push(`${data2[i].date} ${data2[i].startTime}`);
      }
      // loop through timeslots
      for (let j = 0; j < increments.length; j++) {
        const times = [];
        // loop through bookedAppts for each increment
        for (let i = 0; i < bookedAppts.length; i++) {
          // if the bookedAppt is equal to the increment, then push test to the times array
          if (bookedAppts[i] === increments[j]._i) {
            times.push('test');
          }
        }
        console.log(times);
        // if the times array length for that increment is less than the number of walkers (walkers length),
        // then the timeslot is available
        if (times.length < walkers.length) {
          // eslint-disable-next-line no-undef
          availableAppts.push(moment(increments[j].format('dddd, MMMM Do YYYY, h:mm:ss a')));
        }
      }
      console.log(availableAppts);
      const apptsDiv = document.getElementById('appointments');
      $(apptsDiv).empty();
      for (let i = 0; i < availableAppts.length; i++) {
        const apptBtn = document.createElement('btn');
        $(apptBtn).addClass('btn btn-light btn-lg btn-block apptBtn');
        $(apptBtn).attr('data-dateTime', availableAppts[i]._i);
        apptBtn.append(availableAppts[i]._i);
        apptsDiv.append(apptBtn);
      }
      if (apptsDiv.style.display === 'none') {
        apptsDiv.style.display = 'block';
      }
      bookAppt();
    });
  });
  // get appts from db and push into bookedAppts array in correct format
}

function bookAppt() {
  $('.apptBtn').click(function () {
    // eslint-disable-next-line no-undef
    const dateTime = $(this).attr('data-datetime');
    // eslint-disable-next-line no-undef
    const modateTime = moment(dateTime, 'dddd, MMMM Do YYYY, h:mm:ss a');
    const newMo = modateTime.format('YYYY-MM-DD HH:mm:ss');
    const apptParts = newMo.split(' ');
    // started code to look for which walker is availble at that time -----------------------------------
    bookedAppts = [];
    const walkers = [];
    let walkerAssigned;
    $.get(`/api/appointments/${apptParts[0]}`, (data) => {
      // get all booked appointments at that time
      for (let i = 0; i < data.length; i++) {
        if (data[i].startTime === apptParts[1]) {
          bookedAppts.push(data[i]);
        }
      }
      console.log(bookedAppts);
      $.get('api/walkers', (data2) => {
        walkers.push(data2);
      });
      for (let j = 0; j < walkers.length; j++) {
        for (let h = 0; h < bookedAppts.length; h++) {
          if (walkers[j].id === bookedAppts[h].walkerChosen) {
            break;
          }
        }
      }
      // ----------------------------------------------------------------------
      $.post('/api/appointments', {
        date: apptParts[0],
        startTime: apptParts[1],
        walkerChosen: 1,
      })
        // eslint-disable-next-line no-alert
        .then(alert('Success!'));
    });
  });
}
