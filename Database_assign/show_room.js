let data = await eel.show_all_rooms()();
export let rooms = JSON.parse(data);
let roomId;
function loadAllRooms() {
  let html = '';
  rooms.forEach(room => {
    if (room[3] > 0) {
      html += `
      <tr class="room-row"
      data-room-id="${room[0]}">
          <td>${room[0]}</td>
          <td>${room[1]}</td>
          <td>${room[2]}</td>
      </tr>
    `;
    }
  })
  document.getElementById("roomTableBody").innerHTML = html;
  const confirmButton = document.querySelector('.confirm-button');
  document.querySelectorAll('.room-row').forEach(row => {
    row.addEventListener('click', () => {
      roomId = row.dataset.roomId;
      if (row.classList.contains("choosing")) {
        row.classList.remove("choosing");
        confirmButton.classList.remove("button-lighting");
        confirmButton.disabled = true;
      }
      else {
        document.querySelectorAll('.room-row').forEach(row => row.classList.remove('choosing'));
        row.classList.add('choosing');
        confirmButton.classList.add("button-lighting");
        confirmButton.disabled = false;
      }
    });
  });
  confirmButton.addEventListener('click', () => {
    if (!confirmButton.disabled) {
      confirmClickHandle(Number(roomId));
      confirmButton.disabled = true;
      confirmButton.classList.remove("button-lighting");
    }
  });
};
const showButton = document.querySelector('.js-show-button');
showButton.addEventListener('click', () => {
  loadAllRooms();
  if (showButton.classList.contains('showing')) {
    showButton.classList.remove('showing');
    showButton.innerHTML = "Show All Rooms";
    document.querySelector('.confirm-button').classList.remove('button-appear');
    document.getElementById("roomTableBody").innerHTML = '';
  } else {
    showButton.classList.add('showing');
    showButton.innerHTML = "Hide All";
    document.querySelector('.confirm-button').classList.add('button-appear');
  }
});

function confirmClickHandle(roomId) {
  rooms.forEach(async room => {
    if (room[0] === roomId && room[3] > 0) {
      room[3]--;
      const response = await eel.update_room_availability(roomId, room[3])();
      console.log(response); // Log success or error message from backend
    }
  });
  console.log(roomId);
  loadAllRooms();
};




