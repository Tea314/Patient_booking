import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
const url = new URL(window.location.href)
const deptName = url.searchParams.get('name');
const type = url.searchParams.get('title');
const email = url.searchParams.get('email');
const dateInput = document.querySelector('.date-input');
const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng yyyy-mm-dd
dateInput.setAttribute('min', today);

const submitButton = document.querySelector('.submit-button')
let dateDisplay;
let dateSelected;
let information;
(async function () {


  async function getInformation(email) {
    return await eel.get_name(email)();
  }

  information = await getInformation(email);
  console.log(information);
  renderInformation();
})();
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

document.querySelector('.confirm-button').addEventListener('click', async () => {
  if (!document.querySelector('.confirm-button').disabled &&
    document.querySelector('.selected')) {
    if (type.replace(/"/g, '') === "department") {
      const doctor_id = await eel.find_doctor_id(dateSelected, document.querySelector('.selected').innerHTML.split('-')[0], deptName)();
      console.log(doctor_id);
      let confirm_response = `${deptName} - Name: ${information.name} - ID: ${information.id} - Gender: ${information.gender} - DOB: ${information.dob}
        Date: ${dateSelected} - Time: ${document.querySelector('.selected').innerHTML} - Doctor id: ${doctor_id}`;
      document.querySelector('.test_2').innerHTML = confirm_response;
      const insert_appoinment = await eel.add_appointment(dateSelected, document.querySelector('.selected').innerHTML.split('-')[0] + ":00", information.id, doctor_id);
    } else {
      let confirm_response = `${deptName} - Name: ${information.name} - ID: ${information.id} - Gender: ${information.gender} - DOB: ${information.dob}
        Date: ${dateSelected} - Time: ${document.querySelector('.selected').innerHTML} - Doctor id: ${deptName}`;
      document.querySelector('.test_2').innerHTML = confirm_response;
      const insert_appoinment = await eel.add_appointment(dateSelected, document.querySelector('.selected').innerHTML.split('-')[0] + ":00", information.id, deptName);
    }
    alert('Booking success!')
    // window.location.href = `home.html?email=${email}`
  }
})

async function renderTimeSlots(time) {
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
  let time_response
  const timeButtons = document.querySelectorAll('.time');
  if (type.replace(/"/g, '') === "department") {
    time_response = await eel.show_booked_time(dateSelected, time, deptName)();
    console.log(typeof (deptName))
    console.log(deptName)
    console.log(time_response)
    console.log(time)

  }
  else {
    console.log("test")
    console.log(deptName);
    time_response = await eel.show_doctor_time(dateSelected, time, Number(deptName))();
    console.log(time_response);
  }
  // document.querySelector('.test').innerHTML = time_response;
  if (time === "am") {
    time_response.forEach(time => {
      document.querySelector(`.${CSS.escape(time)}`).classList.remove("button-disabled")
    })
  } else if (time === "pm") {
    time_response.forEach(time => {
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
function renderHeader(type) {
  if (type.replace(/"/g, '') === "doctor") {
    document.querySelector('.header').innerHTML = `
      <a class="navigation" href="doctor-booking.html?email=${email}">
        <img style="cursor: pointer;" class="arrow" src="/images/leading-icon.png">
      </a>
      <h1>Booking details</h1>
    `;

  } else if (type.replace(/"/g, '') === "department") {
    document.querySelector('.header').innerHTML = `
      <a class="navigation" href="department-booking.html?email=${email}">
        <img style="cursor: pointer;" class="arrow" src="/images/leading-icon.png">
      </a>
      <h1>Booking details</h1>
    `;
  }
}

renderHeader(type)

function renderInformation() {
  let html = `
    <div style="text-align: center;
        font-size: 1.3em;
        margin-bottom: 40px;">
        <p>Patient information</p>
      </div>

      <div style="display: flex;
        column-gap: 40px;">
        <div>
          <p>Full name:</p>
          <p style="font-weight: 400;">${information.name}</p>
        </div>

        <div>
          <p>Citizen identification number:</p>
          <p style="font-weight: 400;">${information.ssn}</p>
        </div>
      </div>

      <div>
        <label for="gender">Gender:</label>
        <p style="font-weight: 400;">${information.gender}</p>
      </div>

      <div>
        <p>Date of birth:</p>
        <p style="font-weight: 400;">${information.dob}</p>
      </div>
  `;
  document.querySelector(".information").innerHTML = html;
}



