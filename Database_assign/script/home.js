let information;
const url = new URL(window.location.href);
const email = url.searchParams.get('email');
(async function () {


  async function getInformation(email) {
    return await eel.get_name(email)();
  }

  information = await getInformation(email);
  console.log(information);
  renderHeader();

  document.querySelector('.right').addEventListener('click', () => {
    window.location.href = `department-booking.html?email=${email}`;
  })

  document.querySelector('.left').addEventListener('click', () => {
    window.location.href = `doctor-booking.html?email=${email}`;
  })
  document.querySelector('.room-booking').addEventListener('click', () => {
    document.querySelector('.screen-pop-up').classList.remove('hidden')
  })

  const confirmButton = document.querySelector('.confirm-button')

  document.querySelector('.pop-up-input').addEventListener('input', () => {
    if (document.querySelector('.pop-up-input').value) {
      confirmButton.classList.remove('inactive')
      confirmButton.classList.add('active')
      confirmButton.disabled = false;
    } else {
      confirmButton.classList.remove('active')
      confirmButton.classList.add('inactive')
      confirmButton.disabled = true;
    }
  })

  const button = document.querySelector('.confirm-button');
  const spinner = document.querySelector('.spinner');
  const display = document.querySelector('.text-display')

  button.addEventListener('click', () => {
    // Ẩn input và button
    button.style.display = 'none';

    // Hiển thị spinner
    spinner.style.display = 'block';

    // Sau 5 giây khôi phục lại trạng thái ban đầu
    setTimeout(() => {
      spinner.style.display = 'none';
      button.style.display = 'block';
      display.innerHTML = "Founded";
      display.classList.add('founded');
      button.classList.add('inactive');
      button.disabled = true;
      setTimeout(() => {
        window.location.href = `../show_room.html?email=${email}`
      }, 1000);
    }, 2000);
  });

  const popUp = document.querySelector('.screen-pop-up');
  const accPopUp = document.querySelector('.account-pop-up');

  // Thêm sự kiện để ẩn popup khi nhấn ra ngoài
  popUp.addEventListener('click', (event) => {
    if (!event.target.closest('.pop-up')) {
      closePopup(document.querySelector('.pop-up'));
    }
  });

  accPopUp.addEventListener('click', (event) => {
    if (!event.target.closest('.information-pop-up')) {
      closePopup(document.querySelector('.information-pop-up'));
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
      if (popUpContent.classList.contains('pop-up')) {
        popUp.classList.add('hidden');
      } else if (popUpContent.classList.contains('information-pop-up')) {
        accPopUp.classList.add('hidden');
      }
      popUpContent.classList.remove('slide-out');
    }, { once: true });
  }


  async function renderHeader() {
    console.log(information.name);
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

  async function renderAccountPopup() {
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
          <input type="text" class="edit-mode name" value=${information.name} style="display:none;">
        </div>
        <div class="info-row">
          <strong>ID:</strong> 
          <span>${information.ssn}</span>
        </div>
        <div class="info-row">
          <strong>Date of Birth:</strong> 
          <span class="display-mode">${information.dob}</span>
          <input type="date" class="edit-mode date" value=${information.dob} style="display:none;">
        </div>
        <div class="info-row">
          <strong>Gender:</strong> 
          <span class="display-mode">${information.gender}</span>
          <select class="edit-mode gender" style="display:none;">
            <option value="Male" selected>Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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

    editButton.addEventListener('click', async () => {
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
        const update = await eel.update_in4(email, document.querySelector('.name').value, document.querySelector('.gender').value, document.querySelector('.date').value)();
        console.log(update);
        information = await getInformation(email);
        renderHeader();
      }
    });
  }
})();


