// SIGNUP
const signupForm = document.querySelector(".signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(),
      name: document.querySelectorAll(".signup-input")[0].value,
      email: document.querySelectorAll(".signup-input")[1].value,
      phone: document.querySelectorAll(".signup-input")[2].value,
      password: document.querySelectorAll(".signup-input")[3].value,
      addresses: [
        {
          id: Date.now(),
          text: document.querySelector(".signup-textarea").value,
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

    // AUTO LOGIN
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Signup successful");
    window.location.href = "index.html";
  });
}

// LOGIN
const loginForm = document.querySelector(".login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelectorAll(".login-input")[0].value;
    const password = document.querySelectorAll(".login-input")[1].value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials.Please try again.");
    }
  });
}
