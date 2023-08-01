document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".load--page");
  const mainContent = document.querySelector(".user--home--page");

  function showMainContent() {
    loadingScreen.style.display = "none";
    mainContent.style.display = "block";
  }
  setTimeout(showMainContent, 400);
});

const userName = document.querySelector(".user--name");
const inspoName = document.querySelector(".user--inspo");

async function getDashboardInfo() {
  try {
    const responseDashboard = await axios.get("/user/dashboard");
    console.log(responseDashboard);
    if (!responseDashboard) {
      console.log("Not okay");
    }
    const { name } = responseDashboard.data.user;
    console.log(name);
    userName.textContent = name;
    inspoName.textContent = `Dear ${name},`;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) {
      window.location.href = "http://localhost:9000";
    }
  }
}

window.onload = function () {
  if (window.location.href === "http://localhost:9000/userdashboard") {
    getDashboardInfo();
  }
};

const logoutBtn = document.querySelector(".logout--btn");

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    console.log("log out");
    await axios.delete("/api/v1/auth/logout");
    window.location.href = "http://localhost:9000";
  } catch (error) {
    console.log(error);
  }
});
