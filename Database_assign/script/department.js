import { departments } from "./data/department.js";

function renderDepartment(name = '') {
  let html = ''
  departments.forEach(department => {
    if (department.name.toLowerCase().includes(name.toLowerCase())) {
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
    }
  });
  document.querySelector('.content').innerHTML = html;
  document.querySelectorAll('.book-button').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.departmentName
      window.location.href = `booking.html?name=${name}&title=department`;
    })
  })
}

renderDepartment();

document.querySelector(".search-bar").addEventListener("input", event => {
  console.log(event.target.value);
  renderDepartment(event.target.value);
})