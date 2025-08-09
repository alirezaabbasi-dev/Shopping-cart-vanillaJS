const $ = document;
const siteTitle = $.querySelector(".site-title h2");
window.addEventListener("load", () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const userName = getCookie("username");
  const currentPage = window.location.pathname;

  siteTitle ? (siteTitle.textContent += " " + userName) : "";

  if (userName && currentPage.endsWith("signup.html")) {
    window.location.href = "./index.html";
  } else if (!userName && currentPage.endsWith("index.html")) {
    window.location.href = "./signup.html";
  }
});
