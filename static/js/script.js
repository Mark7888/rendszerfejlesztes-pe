function checkLoggedIn() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    window.location.href = "/blog";
  } else {
    $("#loginModal").modal("show");
  }
}

document.getElementById("userButton").addEventListener("click", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userButton = document.getElementById("userButton");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toggleRegisterButton = document.getElementById("toggleRegister");

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    userButton.textContent = "Logout";
  }

  toggleRegisterButton.addEventListener("click", function () {
    if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      toggleRegisterButton.textContent = "Register";
    } else {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      toggleRegisterButton.textContent = "Login";
    }
  });

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const storedUser = JSON.parse(localStorage.getItem(username));

      if (storedUser && storedUser.password === password) {
        localStorage.setItem("loggedInUser", username);
        userButton.textContent = "Logout";
        $("#loginModal").modal("hide");
        window.location.href = "/blog";
      } else {
        alert("Invalid username or password");
      }
    });

  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("registerName").value;
      const username = document.getElementById("registerUsername").value;
      const password = document.getElementById("registerPassword").value;

      if (localStorage.getItem(username)) {
        alert("Username already exists");
        return;
      }

      const newUser = {
        name: name,
        username: username,
        password: password,
      };

      localStorage.setItem(username, JSON.stringify(newUser));

      alert(
        "Registration successful!\nName: " + name + "\nUsername: " + username,
      );

      $("#toggleRegister").click();
    });

  userButton.addEventListener("click", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      localStorage.removeItem("loggedInUser");
      userButton.textContent = "USER";
      window.location.href = "/";
    }
  });
});
