
function getCookie(name) {
  let cookieArr = document.cookie.split("; ");
  for(let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if(name == cookiePair[0]) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function removeCookie(name) { 
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function loginLogout() {
  const loggedInUser = getCookie('loggedInUser');
  if (loggedInUser) {
    removeCookie("loggedInUser");
    window.location.href = "/logout";
  } else {
    $("#loginModal").modal("show");
  }
}


window.addEventListener("load", function () {
  const userButton = document.getElementById("loginLogoutButton");
  
  const doLogin = document.body.dataset.login === 'True';

  const loggedInUser = getCookie('loggedInUser');
  if (loggedInUser) {
    userButton.textContent = "Logout";
  }
  else {
    if (doLogin === true) {
      $("#loginModal").modal("show");

      const loginError = document.body.dataset.loginError === 'True';
      if (loginError) {
        let errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('d-none');
      }
    }
  }

  userButton.addEventListener("click", function () {
    const loggedInUser = getCookie('loggedInUser');
    if (loggedInUser) {
      removeCookie("loggedInUser");
      window.location.href = "/logout";
    }
  });
});
