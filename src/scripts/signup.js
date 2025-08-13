const $ = document;
function initKiuiBgForm(
  BgColor1 = "#000",
  BgColor2 = "#fff",
  circleColor1 = "#000",
  circleColor2 = "#fff"
) {
  // Background colors
  document.body.style.setProperty("--bg-color-1", `${BgColor1}`);
  document.body.style.setProperty("--bg-color-2", `${BgColor2}`);
  // Circle Colors
  document.body.style.setProperty("--circle-color-1", `${circleColor1}`);
  document.body.style.setProperty("--circle-color-2", `${circleColor2}`);
}
initKiuiBgForm("#00bc7d", "#000", "#00ff84", "#000");

const usernameInput = $.querySelector("#username");
const passwordInput = $.querySelector("#password");
const signupBtn = $.querySelector("#signup-btn");

function signup(userName, userPassword) {
  const userNameValidation =
    /^(?=.{3,30}$)(?![._-])(?!.*[._-]{2})[A-Za-z0-9._-]+(?<![._-])$/;
  if (userNameValidation.test(userName)) {
    cookieHandler(userName)
  }else{
    usernameInput.backgroundColor="red"
  }
}
function cookieHandler(userName) {
  const d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000); // Cookie expires in 7 days
  let expires = "expires=" + d.toUTCString();
  document.cookie = `username=${userName};` + expires + ";path=/";
}

signupBtn.addEventListener("click", () => signup(usernameInput.value, passwordInput.value));



