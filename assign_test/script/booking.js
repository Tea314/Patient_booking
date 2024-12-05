import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { times_am, times_pm } from './data/time.js';

const url = new URL(window.location.href)
const deptName = url.searchParams.get('name');

const dateInput = document.querySelector('.date-input');
const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng yyyy-mm-dd
dateInput.setAttribute('min', today);

const submitButton = document.querySelector('.submit-button')
let dateDisplay;
let dateSelected;
dateInput.addEventListener('input', () => {
  dateDisplay = dayjs(dateInput.value).format('dddd DD MMMM YYYY');
  dateSelected = dayjs(dateInput.value).format('YYYY-MM-DD');
  if (dateInput.value) {
    submitButton.disabled = false;
    submitButton.classList.add('submit-button-active');
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('submit-button-active');
  }
});

submitButton.addEventListener('click', () => {
  if (!submitButton.disabled) {
    document.querySelector('.confirm-button').classList.add('confirm-button-active')
    document.querySelector('.confirm-button').disabled = false;
    document.querySelector('.date-display').innerHTML = `
      <div style="margin-bottom: 25px;
        margin-top: 20px;
        font-size:1.2em;
        font-weight: 500;
        font-family: Roboto">Choosen date: ${dateDisplay}</div>
      <div class="time-container">
        <div class="time-header">
          <button class="am-button">AM</button>
          <button class="pm-button">PM</button>
        </div>
        <div class="time-slots">
          
        </div>
      </div>
    `;
    renderTimeSlots("am")
    const buttonAm = document.querySelector('.am-button');
    const buttonPm = document.querySelector('.pm-button');

    buttonAm.classList.add('choosing')
    document.querySelector('.am-button').addEventListener('click', () => {
      if (buttonPm.classList.contains("choosing")) {
        buttonPm.classList.remove("choosing");
      }
      buttonAm.classList.add('choosing')
      renderTimeSlots("am");
    })

    document.querySelector('.pm-button').addEventListener('click', () => {
      if (buttonAm.classList.contains("choosing")) {
        buttonAm.classList.remove("choosing");
      }
      buttonPm.classList.add("choosing");
      renderTimeSlots("pm");
    })
  }
})

document.querySelector('.confirm-button').addEventListener('click', () => {
  if (!document.querySelector('.confirm-button').disabled &&
    document.querySelector('.name-input').value &&
    document.querySelector('.gender-input').value &&
    document.querySelector('.dob-input').value &&
    document.querySelector('.id-input').value) {
    console.log(
      `${deptName} - Name: ${document.querySelector('.name-input').value} - ID: ${document.querySelector('.id-input').value} - Gender: ${document.querySelector('.gender-input').value} - DOB: ${document.querySelector('.dob-input').value}
      Date: ${dateSelected} - Time: ${document.querySelector('.selected').innerHTML}`
    );
  }
})

function renderTimeSlots(time) {
  if (time === "am") {
    document.querySelector('.time-slots').innerHTML = `
      <button class="time button-disabled 10:00-10:10">10:00-10:10</button>
      <button class="time button-disabled 10:10-10:20">10:10-10:20</button>
      <button class="time button-disabled 10:20-10:30">10:20-10:30</button>
      <button class="time button-disabled 10:30-10:40">10:30-10:40</button>
      <button class="time button-disabled 10:40-10:50">10:40-10:50</button>
      <button class="time button-disabled 10:50-11:00">10:50-11:00</button>
      <button class="time button-disabled 11:00-11:10">11:00-11:10</button>
      <button class="time button-disabled 11:10-11:20">11:10-11:20</button>
      <button class="time button-disabled 11:20-11:30">11:20-11:30</button>
      <button class="time button-disabled 11:30-11:40">11:30-11:40</button>
      <button class="time button-disabled 11:40-11:50">11:40-11:50</button>
      <button class="time button-disabled 11:50-12:00">11:50-12:00</button>
    `;
  } else if (time === "pm") {
    document.querySelector('.time-slots').innerHTML = `
      <button class="time button-disabled 15:00-15:10">15:00-15:10</button>
      <button class="time button-disabled 15:10-15:20">15:10-15:20</button>
      <button class="time button-disabled 15:20-15:30">15:20-15:30</button>
      <button class="time button-disabled 15:30-15:40">15:30-15:40</button>
      <button class="time button-disabled 15:40-15:50">15:40-15:50</button>
      <button class="time button-disabled 15:50-16:00">15:50-16:00</button>
      <button class="time button-disabled 16:00-16:10">16:00-16:10</button>
      <button class="time button-disabled 16:10-16:20">16:10-16:20</button>
      <button class="time button-disabled 16:20-16:30">16:20-16:30</button>
      <button class="time button-disabled 16:30-16:40">16:30-16:40</button>
      <button class="time button-disabled 16:40-16:50">16:40-16:50</button>
      <button class="time button-disabled 16:50-17:00">16:50-17:00</button>
    `;
  }

  const timeButtons = document.querySelectorAll('.time');
  if (time === "am") {
    times_am.forEach(time => {
      document.querySelector(`.${CSS.escape(time)}`).classList.remove("button-disabled")
    })
  } else if (time === "pm") {
    times_pm.forEach(time => {
      document.querySelector(`.${CSS.escape(time)}`).classList.remove("button-disabled")
    })
  }


  timeButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (!button.classList.contains('button-disabled')) {
        // Xóa class selected khỏi tất cả các nút
        timeButtons.forEach(btn => btn.classList.remove('selected'));

        // Thêm class selected cho nút được nhấp
        button.classList.add('selected');
      }
    });
  });
}


