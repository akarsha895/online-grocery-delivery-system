//SIGNUP
const signupForm = document.querySelector(".signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const name = document.querySelectorAll(".signup-input")[0].value.trim();
    const email = document.querySelectorAll(".signup-input")[1].value.trim();
    const phone = document.querySelectorAll(".signup-input")[2].value.trim();
    const password = document.querySelectorAll(".signup-input")[3].value.trim();
    const addressText = document.querySelector(".signup-textarea").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name || !email || !phone || !password || !addressText) {
      alert("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character",
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      addresses: [
        {
          id: Date.now(),
          text: addressText,
        },
      ],
    };

    const exists = users.find((u) => u.email === newUser.email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully. Please login to continue.");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.querySelector(".login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelectorAll(".login-input")[0].value.trim();
    const password = document.querySelectorAll(".login-input")[1].value.trim();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}
