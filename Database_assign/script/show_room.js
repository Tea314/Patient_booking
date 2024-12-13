let selectedDatesNormal = ['2024-12-15'];
let selectedDatesDeluxe = ['2024-12-20'];
let selectedDatesPrivate = ['2024-12-22'];
let chosen_button;
const url = new URL(window.location.href)
const email = url.searchParams.get('email');
let information;
(async function () {


  async function getInformation(email) {
    return await eel.get_information_room_booking(email)();
  }

  information = await getInformation(email);
  console.log(information);
  renderHeader()
  renderInformation(information.id);
})();

function renderInformation(id) {
  document.querySelector('.left').innerHTML = `
    <h1>Your information</h1>
    <p style="font-weight: 500;">Name</p>
    <p>&#9679 ${information.patient_name}</p>
    <p style="font-weight: 500;">ID</p>
    <p>&#9679 ${information.patient_id}</p>
    <p style="font-weight: 500;">Doctor booked</p>
    <p>&#9679 ${information.doctor_name}</p>
    <p style="font-weight: 500;">Department</p>
    <p>&#9679 ${information.speciality}</p>
  `;
}


renderCalender(selectedDatesNormal);
document.querySelector('.normal-button').classList.add('room-selected')

document.querySelectorAll('.room-button').forEach(button => {
  let para = button.dataset.selectedDates;
  button.addEventListener('click', () => {
    if (para === 'selectedDatesNormal') {
      chosen_button = 'normal';
      renderCalender(selectedDatesNormal)
    } else if (para === 'selectedDatesDeluxe') {
      chosen_button = 'deluxe';
      renderCalender(selectedDatesDeluxe)
    } else {
      chosen_button = 'private';
      renderCalender(selectedDatesPrivate)
    }
    document.querySelectorAll('.room-button').forEach(button => {
      if (button.classList.contains('room-selected')) {
        button.classList.remove('room-selected')
      }
    })
    button.classList.add("room-selected")
  })
})

function renderCalender(selectedDatesRoom) {
  document.getElementById('confirm-btn').disabled = true;
  const selectedDates = selectedDatesRoom; // Các ngày đã khóa
  const tempSelectedDates = new Set();
  console.log("CLEAR")
  // Tạo lịch 30 ngày tiếp theo
  const today = new Date();
  const days = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
    };
  });

  // Render lịch
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = "";
  days.forEach(({ date, day, month, year }, index) => {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    dayElement.dataset.date = date;
    dayElement.classList.add('data-date')

    if (selectedDates.includes(date)) {
      dayElement.classList.add('disabled');
    }

    calendar.appendChild(dayElement);
  });

  // Xử lý sự kiện click
  document.querySelectorAll('.data-date').forEach(date => {
    date.addEventListener("click", () => {
      console.log("CLICK")
      if (!date.classList.contains('disabled')) {
        const js_date = date.dataset.date;
        if (tempSelectedDates.has(js_date)) {
          // Xóa js_date khỏi danh sách
          tempSelectedDates.delete(js_date);
          date.classList.remove('selected');

          // Duyệt qua các ngày trong tempSelectedDates
          tempSelectedDates.forEach(selectedDate => {
            if (new Date(selectedDate) > new Date(js_date)) {
              // Tìm đối tượng trong DOM
              const elementToRemoveClass = document.querySelector(`[data-date="${selectedDate}"]`);

              if (elementToRemoveClass) {
                elementToRemoveClass.classList.remove('selected'); // Xóa class 'selected'
              }

              // Xóa ngày khỏi danh sách
              tempSelectedDates.delete(selectedDate);
            }
          });
        } else {
          tempSelectedDates.add(js_date);
          date.classList.add('selected');

          // Nếu đã chọn 2 ngày, kiểm tra khoảng giữa
          if (tempSelectedDates.size >= 2) {
            const selectedArray = [...tempSelectedDates].sort(); // Sắp xếp ngày theo thứ tự
            const [startDate, endDate] = selectedArray;

            if (!isValidRange(startDate, endDate, selectedDates)) {
              alert('Khoảng giữa chứa ngày đã bị khóa. Vui lòng chọn lại!');
              resetSelection();
            } else {
              highlightRange(startDate, endDate);
            }
          }
        }
        validateSelection();
      }
      console.log(tempSelectedDates.size)
      if (tempSelectedDates.size !== 0) {
        console.log("OK")
        document.getElementById('confirm-btn').disabled = false;
        document.getElementById('confirm-btn').classList.remove('inactive');
      } else {
        document.getElementById('confirm-btn').disabled = true;
        document.getElementById('confirm-btn').classList.add('inactive');
      }
    })
  })

  // Kiểm tra xem khoảng giữa có ngày "disabled" không
  function isValidRange(startDate, endDate, selectedDates) {
    console.log(startDate);
    console.log(endDate);
    const rangeDates = days
      .filter(({ date }) => new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate))
      .map(({ date }) => date);

    return !rangeDates.some((date) => selectedDates.includes(date));
  }

  // Làm sáng khoảng giữa hai ngày nếu hợp lệ
  function highlightRange(startDate, endDate) {
    const rangeDates = days
      .filter(({ date }) => new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate))
      .map(({ date }) => date);

    rangeDates.forEach((date) => {
      const element = document.querySelector(`[data-date="${date}"]`);
      if (element) {
        tempSelectedDates.add(date);
        element.classList.add('selected');
      }
    });
  }

  // Reset lựa chọn
  function resetSelection() {
    tempSelectedDates.clear();
    document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'));
  }

  // Kiểm tra nút xác nhận
  function validateSelection() {
    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.disabled = tempSelectedDates.size === 0;
  }

  // Xác nhận lựa chọn
  document.getElementById('confirm-btn').addEventListener('click', () => {
    if (!document.getElementById('confirm-btn').disabled) {
      const selectedDatesContainer = document.querySelector('.selected-dates');
      const sortedDates = [...tempSelectedDates].sort();
      const firstDate = sortedDates[0];
      const lastDate = sortedDates[sortedDates.length - 1];
      let roomType;
      let price;
      document.querySelectorAll('.room-button').forEach(button => {
        if (button.classList.contains('room-selected')) {
          roomType = button.dataset.roomType;
          price = Number(button.dataset.price);
        }
      })
      selectedDatesContainer.innerHTML = `Selected dates from ${firstDate} to ${lastDate}
        <h3>Room type: ${roomType}</h3>
        <h3>Total price: ${tempSelectedDates.size * price}$</h3>
        <button>Complete</button>
      `
    }

  });
}


document.querySelector('.confirm-button-date').addEventListener('click', () => {
  document.querySelector('.screen-pop-up').classList.remove('hidden')
})


const popUp = document.querySelector('.screen-pop-up');
popUp.addEventListener('click', (event) => {
  if (!event.target.closest('.pop-up')) {
    if (chosen_button === 'normal') {
      renderCalender(selectedDatesNormal)
    } else if (chosen_button === 'deluxe') {
      renderCalender(selectedDatesDeluxe)
    } else {
      renderCalender(selectedDatesPrivate)
    }
    closePopup();
  }
});

// Hàm ẩn popup với hiệu ứng
function closePopup() {
  const popUpContent = document.querySelector('.pop-up');

  // Thêm lớp "slide-out" để chạy animation
  popUpContent.classList.add('slide-out');

  // Chờ animation hoàn tất rồi thêm lại lớp "hidden"
  popUpContent.addEventListener('animationend', () => {
    popUp.classList.add('hidden');
    popUpContent.classList.remove('slide-out');
  }, { once: true });
}

function renderHeader() {
  document.querySelector('.header').innerHTML = `
        <img style="cursor: pointer;" class="arrow" src="/images/leading-icon.png">
    `;
  document.querySelector(".arrow").addEventListener('click', () => {
    window.location.href = `home.html?email=${email}`;
  })
}





