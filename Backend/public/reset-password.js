const resetPasswordForm = document.querySelector(".reset-password-form");
const resetPasswordFormValue = document.querySelector(".reset-password-input");

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("I have been clicked");
  try {
    const currentURL = window.location.href;
    let email = "";
    let token = "";
    function performActionOnURL(url) {
      if (url.includes("/reset-password")) {
        const urlParams = new URLSearchParams(url);
        token = urlParams.get("token");
        email = urlParams.get("email");
      }
    }
    performActionOnURL(currentURL);
    await axios.post("/api/v1/auth/reset-password", {
      password: resetPasswordFormValue.value,
      email,
      token,
    });
    window.location.href = "http://localhost:9000/passwordResetSuccessful";
  } catch (error) {
    console.log(error);
  }
});
