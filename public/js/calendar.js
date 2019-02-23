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
        $(cellBtn).attr('value', date);
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

  $('btn').click(() => {
    // THIS IS THE PROBLEM
    const btnValue = this.innerHTML;
    console.log('clicked!');
    // Correct the month number from index
    currentMonth++;

    if (currentMonth < 10) {
      const monthSyntax = (`0${currentMonth}`);
      console.log(`${currentYear}-${monthSyntax}-${btnValue}`);
    } else {
      console.log(`${currentYear}-${currentMonth}-${btnValue}`);
    }

    showAppointments();
  });
}
