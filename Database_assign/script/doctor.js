import { doctors } from "./data/doctor.js";

const url = new URL(window.location.href);
const email = url.searchParams.get('email');

function renderDepartment(name = '') {
  let html = ''
  doctors.forEach(doctor => {
    if (doctor[1].toLowerCase().includes(name.toLowerCase()) || doctor[2].toLowerCase().includes(name.toLowerCase())) {
      html += `
        <div class="container">
          <div class="first-row">
              <img class="dept-img" src=${doctor[3]}></img>
              <p>${doctor[1]}</p>
          </div>
          <h2>${doctor[2]}</h2>
          <div class="second-row">
              <button class="book-button"
              data-doctor-id="${doctor[0]}">Book now</button>
          </div>
        </div>
      `;
    }
  });
  if (!doctors) {
    document.querySelector('.content').innerHTML = "<p>no data</p>";
  }
  document.querySelector('.content').innerHTML = html;
  document.querySelectorAll('.book-button').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.doctorId
      window.location.href = `booking.html?name=${id}&title=doctor&email=${email}`;
    })
  })
}

renderDepartment();

document.querySelector(".search-bar").addEventListener("input", event => {
  console.log(event.target.value);
  renderDepartment(event.target.value);
})

document.querySelector('.arrow').addEventListener('click', () => {
  window.location.href = `home.html?email=${email}`
})