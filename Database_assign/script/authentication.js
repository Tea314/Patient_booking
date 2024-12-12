function renderLogin() {
  document.querySelector('.right').innerHTML = `
    <div class="login-box">
          <div style="display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;">
            <h2 style="margin: 0;
              color: #000;
              font-family: Roboto;
              font-size: 35px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: -1px;
              ">Welcome back</h2>
            <div style="display: flex;
              align-items: center;
              justify-content: center;
              column-gap: 6px;">
              <p style="color: #878787;
                  font-family: Roboto;
                  font-size: 15px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;">New to App?</p>
              <a class="sign-up-ui" style="font-size: 15px;
                cursor: pointer;
                color: var(--primary, #3B9AB8);
                text-decoration-line: underline;
                text-decoration-style: solid;
                text-decoration-skip-ink: auto;
                text-decoration-thickness: auto;
                text-underline-offset: auto;
                text-underline-position: from-font;">Sign up</a>
            </div>
          </div>

          <div style="display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;">
            <p style="color: #000;
            font-size: 20px;
            font-weight: 400;">Email address</p>
            <input class="email" placeholder="Email address" style="
            width: 483px;
            padding-left: 14px;
            padding-top: 14px;
            padding-bottom: 16px;
            align-items: center;
            border-radius: 10px;
            border: 1px solid #B6B6B8;">
          </div>

          <div style="display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      gap: 4px;">
            <p style="color: #000;
                      font-size: 20px;
                      font-weight: 400;">Your password</p>
            <div style="position: relative; width: 490px;">
              <input id="password" 
                    type="password" 
                    placeholder="Enter password" 
                    style="display: flex;
                            width: 483px;
                            padding-left: 14px;
                            padding-top: 14px;
                            padding-bottom: 16px;
                            align-items: center;
                            gap: 10px;
                            border-radius: 10px;
                            border: 1px solid #B6B6B8;">
              <button id="togglePassword" 
                      type="button" 
                      style="position: absolute;
                            top: 50%;
                            right: 10px;
                            transform: translateY(-50%);
                            background: none;
                            border: none;
                            cursor: pointer;">
                <img id="eyeIcon" 
                    src="https://cdn-icons-png.flaticon.com/512/709/709612.png" 
                    alt="Show" 
                    style="width: 20px; height: 20px;">
              </button>
            </div>
          </div>

          <div style="display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
            justify-content: center;">
            <button class="login-button inactive" disabled>Login</button>

            <div class="tick-box">
              <a class="forgot-ui" style="font-size: 15px;
              cursor: pointer;
              color: var(--primary, #3B9AB8);
              text-decoration-line: underline;
              text-decoration-style: solid;
              text-decoration-skip-ink: auto;
              text-decoration-thickness: auto;
              text-underline-offset: auto;
              text-underline-position: from-font;">Forgot password?</a>
            </div>

            <div style="display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            align-self: stretch;">
              <p>Or log in with</p>
              <div class="last-row">
                <button><img style="width: 22px;" src="images/google.png"></button>
                <button><img style="width: 22px;" src="images/Facebook.png"></button>
              </div>
            </div>
          </div>
        </div>
  `;

  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');

  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    // Change the eye icon based on the state
    eyeIcon.src = isPassword
      ? 'https://cdn-icons-png.flaticon.com/512/709/709620.png'  // Eye with slash (Hide)
      : 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; // Eye (Show)
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value) {
      document.querySelector('.login-button').classList.remove('inactive');
      document.querySelector('.login-button').disabled = false;
    } else {
      document.querySelector('.login-button').classList.add('inactive');
      document.querySelector('.login-button').disabled = true;
    }
  })

  document.querySelector('.sign-up-ui').addEventListener('click', () => {
    renderSignUp()
  })

  document.querySelector('.forgot-ui').addEventListener('click', () => {
    document.querySelector('.right').innerHTML = "<h1>Sign</h1>"
  })

  const loginButton = document.querySelector('.login-button');
  loginButton.addEventListener('click', async () => {
    const email = document.querySelector('.email').value;
    let role = await eel.get_role(email)();
    console.log(role);
    if (!loginButton.disabled) {
      if (role === 'PATIENT') {
        window.location.href = `../home.html?email=${document.querySelector('.email').value}`
      }
      else if (role === 'DOCTOR') {

      }
      else if (role === 'ADMIN') {

      }
      else if (role === 'Wrong account') {
        window.alert('Not found account.\nPlease input again!!');
      }
    }
  })
}

function renderSignUp() {
  document.querySelector('.right').innerHTML = `
    <form class="login-box">
      <div style="display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;">
        <h2 style="margin: 0;
          color: #000;
          font-family: Roboto;
          font-size: 35px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -1px;
          ">Hey there</h2>
        <div style="display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 6px;">
          <p style="color: #878787;
              font-family: Roboto;
              font-size: 15px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;">Already know App?</p>
          <a class="log-in-ui" style="font-size: 15px;
            cursor: pointer;
            color: var(--primary, #3B9AB8);
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-skip-ink: auto;
            text-decoration-thickness: auto;
            text-underline-offset: auto;
            text-underline-position: from-font;">Log In</a>
        </div>
      </div>

      <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;">
        <p style="color: #000;
        font-size: 20px;
        font-weight: 400;">Email address</p>
        <input required class="email" placeholder="Email address" style="
        width: 483px;
        padding-left: 14px;
        padding-top: 14px;
        padding-bottom: 16px;
        align-items: center;
        border-radius: 10px;
        border: 1px solid #B6B6B8;">
        <div class="email-notification">
        </div>
      </div>

      <div style="display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;">
        <p style="color: #000;
                  font-size: 20px;
                  font-weight: 400;">Your password</p>
        <div style="position: relative; width: 490px;">
          <input required id="password1" 
                type="password" 
                placeholder="Enter password" 
                style="display: flex;
                        width: 483px;
                        padding-left: 14px;
                        padding-top: 14px;
                        padding-bottom: 16px;
                        align-items: center;
                        gap: 10px;
                        border-radius: 10px;
                        border: 1px solid #B6B6B8;">
          <button id="togglePassword1" 
                  type="button" 
                  style="position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        cursor: pointer;">
            <img id="eyeIcon1" 
                src="https://cdn-icons-png.flaticon.com/512/709/709612.png" 
                alt="Show" 
                style="width: 20px; height: 20px;">
          </button>
        </div>
      </div>

      <div style="display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;">
        <p style="color: #000;
                  font-size: 20px;
                  font-weight: 400;">Confirm your password</p>
        <div style="position: relative; width: 490px;">
          <input required id="password2" 
                type="password" 
                placeholder="Enter password" 
                style="display: flex;
                        width: 483px;
                        padding-left: 14px;
                        padding-top: 14px;
                        padding-bottom: 16px;
                        align-items: center;
                        gap: 10px;
                        border-radius: 10px;
                        border: 1px solid #B6B6B8;">
          <button id="togglePassword2" 
                  type="button" 
                  style="position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        cursor: pointer;">
            <img id="eyeIcon2" 
                src="https://cdn-icons-png.flaticon.com/512/709/709612.png" 
                alt="Show" 
                style="width: 20px; height: 20px;">
          </button>
        </div>
        <p class="display-message" style="color: red; font-size: 14px; margin: 4px 0 0;"></p>
      </div>
      <div style="display:flex;
        gap: 20px;
        align-items: center;">
        <label style="display: flex; align-items: center; gap: 4px; font-size: 16px;">
          <input class="doctor-check" type="checkbox" style="width: 16px; height: 16px;">
          Doctor
        </label>
        <div></div>
      </div>

      <div style="display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        justify-content: center;">
        <button class="login-button" type="submit">Continue</button>

        <div style="display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        align-self: stretch;">
          <p>Or log in with</p>
          <div class="last-row">
            <button><img style="width: 22px;" src="images/google.png"></button>
            <button><img style="width: 22px;" src="images/Facebook.png"></button>
          </div>
        </div>
      </div>
    </form>
  `;

  const doctorCheck = document.querySelector(".doctor-check")

  const form = document.querySelector(".login-box");

  function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

    eyeIcon.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      // Change the eye icon based on the state
      eyeIcon.src = isPassword
        ? 'https://cdn-icons-png.flaticon.com/512/709/709620.png'  // Eye with slash (Hide)
        : 'https://cdn-icons-png.flaticon.com/512/709/709612.png'; // Eye (Show)
    });
  }

  // Apply toggle function to both password fields
  togglePasswordVisibility('password1', 'eyeIcon1');
  togglePasswordVisibility('password2', 'eyeIcon2');


  const passwordInput1 = document.getElementById('password1');
  const passwordInput2 = document.getElementById('password2');
  const displayMessage = document.querySelector('.display-message');


  function checkPasswordMatch() {
    if (passwordInput1.value && passwordInput2.value && document.querySelector('.email').value) {
      if (passwordInput1.value === passwordInput2.value) {
        passwordInput2.setCustomValidity("");
      } else {
        passwordInput2.setCustomValidity("Un-match password")
      }
    } else {
      displayMessage.textContent = "";
    }
  }

  function checkPasswordValid() {
    const password = passwordInput1.value;
    // Kiểm tra độ dài
    const lengthValid = password.length >= 10 && password.length <= 20;
    // Kiểm tra có ít nhất 1 số
    const hasNumber = /\d/.test(password);
    // Kiểm tra có ít nhất 1 chữ in hoa
    const hasUpperCase = /[A-Z]/.test(password);
    if (!lengthValid) {
      passwordInput1.setCustomValidity("Length must be 10-20 characters")
    } else if (!hasNumber) {
      passwordInput1.setCustomValidity("Must contains at least 1 number")
    } else if (!hasUpperCase) {
      passwordInput1.setCustomValidity("Must contains at least 1 uppercase letter")
    } else {
      passwordInput1.setCustomValidity("")
    }
  }



  passwordInput1.addEventListener('input', checkPasswordValid);
  passwordInput2.addEventListener('input', checkPasswordMatch);

  const emailInput = document.querySelector(".email");

  emailInput.addEventListener('input', () => {
    if (!emailInput.value.includes("@gmail.com")) {
      emailInput.setCustomValidity("Must contains @gmail.com");
    } else {
      emailInput.setCustomValidity("");
    }
    checkPasswordMatch();
  })

  document.querySelector('.log-in-ui').addEventListener('click', () => {
    renderLogin();
  });


  form.addEventListener('submit', (e) => {
    if (!emailInput.checkValidity() || !passwordInput1.checkValidity()) {
      e.preventDefault();
    }
    const savedEmail = emailInput.value;
    const savedPassword = passwordInput1.value;
    const doctor_check = doctorCheck.checked;
    e.preventDefault();
    renderInformationInput(savedEmail, savedPassword, doctor_check);
  })


}


function renderInformationInput(savedEmail, savedPassword, doctorCheck) {
  const check = doctorCheck;
  let html = `
    <form class="login-box">
      <div style="display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;">
        <h2 style="margin: 0;
          color: #000;
          font-family: Roboto;
          font-size: 35px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -1px;
          ">Hey there</h2>
        <div style="display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 6px;">
          <p style="color: #878787;
              font-family: Roboto;
              font-size: 15px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;">Already know App?</p>
          <a class="log-in-ui" style="font-size: 15px;
            cursor: pointer;
            color: var(--primary, #3B9AB8);
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-skip-ink: auto;
            text-decoration-thickness: auto;
            text-underline-offset: auto;
            text-underline-position: from-font;">Log In</a>

          <a class="go-back" style="font-size: 15px;
            cursor: pointer;
            margin-left: 10px;
            color: var(--primary, #3B9AB8);
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-skip-ink: auto;
            text-decoration-thickness: auto;
            text-underline-offset: auto;
            text-underline-position: from-font;">Go back</a>
        </div>
      </div>

      <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;">
        <p style="color: #000;
        font-size: 20px;
        font-weight: 400;">Full name</p>
        <input required class="name" placeholder="Name" style="
        width: 483px;
        padding-left: 14px;
        padding-top: 14px;
        padding-bottom: 16px;
        align-items: center;
        border-radius: 10px;
        border: 1px solid #B6B6B8;">
      </div>

      <div style="display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;">
        <p style="color: #000;
                  font-size: 20px;
                  font-weight: 400;">Citizen ID</p>
        <div required style="position: relative; width: 490px;">
          <input class="id" id="id" 
                type="id" 
                placeholder="Enter ID" 
                style="display: flex;
                        width: 483px;
                        padding-left: 14px;
                        padding-top: 14px;
                        padding-bottom: 16px;
                        align-items: center;
                        gap: 10px;
                        border-radius: 10px;
                        border: 1px solid #B6B6B8;">
        </div>
      </div>

      <div style="display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;">
        <p style="color: #000;
                  font-size: 20px;
                  font-weight: 400;">Date of birth</p>
        <div style="position: relative; width: 490px;">
          <input class="dob" required id="dob" 
                type="date" 
                style="display: flex;
                        width: 483px;
                        padding-left: 14px;
                        padding-top: 14px;
                        padding-bottom: 16px;
                        align-items: center;
                        gap: 10px;
                        border-radius: 10px;
                        border: 1px solid #B6B6B8;">
        </div>
      </div>

      <div style="display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;">
        <p style="color: #000;
                  font-size: 20px;
                  font-weight: 400;">Gender</p>
        <div style="position: relative; width: 490px;">
          <select class="gender" required id="gender" 
                  style="display: flex;
                        width: 500px;
                        padding-left: 14px;
                        padding-top: 14px;
                        padding-bottom: 16px;
                        align-items: center;
                        gap: 10px;
                        border-radius: 10px;
                        border: 1px solid #B6B6B8;
                        background: #fff;
                        appearance: none; /* Loại bỏ mũi tên mặc định trên một số trình duyệt */
                        -webkit-appearance: none; /* Đối với Safari/Chrome */
                        -moz-appearance: none; /* Đối với Firefox */
                        cursor: pointer;">
            <option value="" disabled selected>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
  `;
  if (check) {
    html += `
    <div style="display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;">
      <p style="color: #000;
                font-size: 20px;
                font-weight: 400;">Specialty</p>
      <div style="position: relative; width: 490px;">
        <input class="specialty" required id="specialty" 
              type="specialty" 
              placeholder="Enter Specialty" 
              style="display: flex;
                      width: 483px;
                      padding-left: 14px;
                      padding-top: 14px;
                      padding-bottom: 16px;
                      align-items: center;
                      gap: 10px;
                      border-radius: 10px;
                      border: 1px solid #B6B6B8;">
      </div>
    </div>
      `;
  }


  html += `
      <div style="display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        justify-content: center;">
        <button class="login-button" type="submit">Sign Up</button>
      </div>
    </form>
  `;
  document.querySelector(".right").innerHTML = html;

  document.querySelector('.log-in-ui').addEventListener('click', () => {
    renderLogin();
  });

  document.querySelector('.go-back').addEventListener('click', () => {
    renderSignUp();
  });


  const form = document.querySelector(".login-box");

  const nameInput = form.querySelector(".name");
  const idInput = form.querySelector(".id");
  const dobInput = form.querySelector(".dob");
  const genderInput = form.querySelector(".gender")
  let specialtyInput;
  if (check) { specialtyInput = form.querySelector(".specialty"); }

  function checkId() {
    if (idInput.value.length === 10 && /^[0-9]+$/.test(idInput.value)) {
      idInput.setCustomValidity("");
    } else {
      idInput.setCustomValidity("ID must contains 10 numbers")
    }
  }

  idInput.addEventListener("input", checkId)
  form.addEventListener('submit', async (e) => {
    if (!idInput.checkValidity()) {
      e.preventDefault();
    }
    e.preventDefault();
    const fullName = nameInput.value;
    const id = idInput.value;
    const dob = dobInput.value;
    const gender = genderInput.value;
    if (check) {
      const specialty = specialtyInput.value;
      let approve = {
        name: fullName,
        id: id,
        dob: dob,
        gender: gender,
        specialty: specialty,
        email: savedEmail,
        password: savedPassword
      }
      localStorage.setItem("approveData", JSON.stringify(approve));
      console.log(localStorage)
    }
    else {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      let approve = {
        name: fullName,
        id: id,
        dob: dob,
        gender: gender,
        email: savedEmail,
        password: savedPassword,
        today: formattedDate
      };
      console.log(approve);
      const insert_appoinment = await eel.insert_user(fullName, id, savedEmail, savedPassword, gender, dob, 'PATIENT', formattedDate);
      console.log(insert_appoinment);
    }
    // Them else add vao db cho patient
    setTimeout(
      alert("Sign up successful")
      , 1000)
    renderLogin();
  })
}


renderLogin()