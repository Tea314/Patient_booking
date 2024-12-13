import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const url = new URL(window.location.href);
const email = url.searchParams.get('email');
let information;
(async function () {

  let month = "December";
  let year = new Date();
  year = year.getFullYear();

  async function getInformationAssignment(email) {
    return await eel.get_appointment_time(email)();
  }
  async function getInformation(email) {
    return await eel.get_doctor(email)();
  }
  const bookingDate = await getInformationAssignment(email);
  console.log(bookingDate);
  information = await getInformation(email);
  console.log(information);
  renderHeader()
  renderBooking(month, year, bookingDate);
  const accPopUp = document.querySelector('.account-pop-up');
  const reportPopUp = document.querySelector('.report-pop-up');
  // Thêm sự kiện để ẩn popup khi nhấn ra ngoài


  accPopUp.addEventListener('click', (event) => {
    if (!event.target.closest('.information-pop-up')) {
      closePopup(document.querySelector('.information-pop-up'));
    }
  });
  reportPopUp.addEventListener('click', (event) => {
    if (!event.target.closest('.report-information-pop-up')) {
      closePopup(document.querySelector('.report-information-pop-up'));
    }
  });



  // Hàm ẩn popup với hiệu ứng
  function closePopup(popup) {
    const popUpContent = popup;

    // Thêm lớp "slide-out" để chạy animation
    popUpContent.classList.add('slide-out');

    // Chờ animation hoàn tất rồi thêm lại lớp "hidden"
    popUpContent.addEventListener('animationend', () => {
      // Chọn đúng popup container để ẩn
      if (popUpContent.classList.contains('report-information-pop-up')) {
        reportPopUp.classList.add('hidden');
      } else if (popUpContent.classList.contains('information-pop-up')) {
        accPopUp.classList.add('hidden');
      }
      popUpContent.classList.remove('slide-out');
    }, { once: true });
  }


  function renderHeader() {
    document.querySelector('.header').innerHTML = `
    <p>One Person Hospital</p>
    <div style="display: flex;
      align-items: center;
      padding-right: 20px;
      gap: 20px;
      justify-content: center;">
      <p class="account-name">${information.name}</p>
      <img class="acc-img" src="./images/cat.jpg">
    </div>
  `;
    document.querySelector('.acc-img').addEventListener('click', () => {
      document.querySelector('.account-pop-up').classList.remove('hidden')
      renderAccountPopup();
    })
  }

  function renderAccountPopup() {
    const popupContent = document.querySelector('.information-pop-up');

    // Trạng thái ban đầu của form
    let isEditing = false;

    popupContent.innerHTML = `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div class="profile-info">
        <div class="info-row">
          <strong>Full Name:</strong> 
          <span class="display-mode">${information.name}</span>
          <input type="text" class="edit-mode" value="${information.name}" style="display:none;">
        </div>
        <div class="info-row">
          <strong>ID:</strong> 
          <span class="display-mode">${information.ssn}</span>
          <input type="text" class="edit-mode" value="${information.ssn}" style="display:none;">
        </div>
        <div class="info-row">
          <strong>Date of Birth:</strong> 
          <span class="display-mode">${information.dob}</span>
          <input type="date" class="edit-mode" value="${information.dob}" style="display:none;">
        </div>
        <div class="info-row">
          <strong>Gender:</strong> 
          <span class="display-mode">${information.gender}</span>
          <select class="edit-mode" style="display:none;">
            <option value="Male" selected>Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="info-row">
          <strong>Specialty:</strong> 
          <span class="display-mode">${information.speciality}</span>
          <input type="text" class="edit-mode" value="${information.specilatiy}" style="display:none;">
        </div>
      </div>
      <button class="edit-profile-btn">Edit</button>
      <button class="log-out-btn">Log out</button>
    </div>
  `;
    const logOutButton = document.querySelector('.log-out-btn');
    logOutButton.addEventListener('click', () => {
      window.location.href = "authentication.html";
    })
    const editButton = popupContent.querySelector('.edit-profile-btn');
    const displayModes = popupContent.querySelectorAll('.display-mode');
    const editModes = popupContent.querySelectorAll('.edit-mode');

    editButton.addEventListener('click', () => {
      if (!isEditing) {
        // Chuyển sang chế độ chỉnh sửa
        editButton.textContent = 'Save';
        displayModes.forEach(el => el.style.display = 'none');
        editModes.forEach(el => el.style.display = 'inline-block');
        isEditing = true;
      } else {
        // Lưu thay đổi và quay lại chế độ hiển thị
        editModes.forEach((input, index) => {
          displayModes[index].textContent = input.value || input.options[input.selectedIndex].value;
        });

        editButton.textContent = 'Edit';
        displayModes.forEach(el => el.style.display = 'inline-block');
        editModes.forEach(el => el.style.display = 'none');
        isEditing = false;
      }
    });
  }


  function renderBooking(month, year, bookingDate) {
    let html = "";
    html += `
    <div class="month">
      <h2>${month} ${year}</h2>
      <div class="display-content">
      </div>
    </div>
  `;
    document.querySelector(".container").innerHTML = html;
    let html_2 = "";
    bookingDate.forEach(date => {
      const dateObj = new Date(date.day);

      // Lấy ngày 
      const day = dateObj.getDate();

      // Lấy thứ 
      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      html_2 += `
      <div class="content-row">
        <div class="date-box">
          <p>${weekday}</p>
          <p>${day}</p>
        </div>

        <div class="inforamtion" style="height: 100%;
          width: 100%;
          ">
          <div class="first-row">
            <img src="./images/Clock.png">
            <div>${date.time}</div>
          </div>
          <div class="second-row">
            <img src="./images/UserCircle.png">
            <div>${date.name}</div>
          </div>
        </div>
        <button class="report-button" data-day="${day}" data-date="${date.day}" data-name="${date.name}" data-id="${date.ssn}" disabled>Create Report</button>
      </div>
    `;
    })
    document.querySelector(".display-content").innerHTML = html_2;
    const today = dayjs();
    document.querySelectorAll(".report-button").forEach(button => {
      if (Number(button.dataset.day) !== Number(today.format("DD"))) {
        button.disabled = true;
        button.classList.add("disabled");
      } else {
        button.disabled = false;
        button.classList.remove("disabled");
      }
    })
  }



  document.querySelectorAll(".report-button").forEach(button => {
    button.addEventListener('click', () => {
      if (!button.disabled) {
        const name = button.dataset.name;
        const day = button.dataset.date;
        const id = button.dataset.id;
        document.querySelector('.report-pop-up').classList.remove('hidden')
        renderReportPopUp(name, id, day);
      }
    })
  })

  function renderReportPopUp(name, id, day) {
    const popupContent = document.querySelector('.report-information-pop-up');

    // Trạng thái ban đầu của form
    let isEditing = false;

    popupContent.innerHTML = `
    <div class="profile-container">
      <h2>Patient Report - Date: ${day}</h2>
      <div class="profile-info">
        <div class="info-row">
          <strong>Full Name:</strong> 
          <span class="display-mode">${name}</span>
        </div>
        <div class="info-row">
          <strong>ID:</strong> 
          <span class="display-mode">${id}</span>
        </div>
        
        <div class="info-row">
          <strong>Diagnosis:</strong> 
          <input class="diagnosis" type="text" style="font-size:17px;">
        </div>
      </div>
      <button class="save-button">Save</button>
    </div>
  `;
    document.querySelector(".save-button").addEventListener('click', () => {
      if (document.querySelector(".diagnosis").value) {
        let reportId;
        const patientDiagnosis = document.querySelector('.diagnosis').value;
        const patientId = id;
        closePopup(document.querySelector('.report-information-pop-up'));
      }
    })
  }
})();