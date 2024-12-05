import { departments } from "./data/department.js";

function renderDepartment() {
  let html = ''
  departments.forEach(department => {
    html += `
      <div class="container">
        <div class="first-row">
            <img class="dept-img" src=${department.images}></img>
            <p>${department.name}</p>
        </div>
        <div class="second-row">
          <button class="book-button"
          data-department-name="${department.name}">Book now</button>
        </div>
      </div>
    `;
  });
  document.querySelector('.content').innerHTML = html;
  document.querySelectorAll('.book-button').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.departmentName
      window.location.href=`booking.html?name=${name}`
    })
  })
}

renderDepartment();