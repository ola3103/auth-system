const forgotPasswordForm = document.querySelector(".forgot--password-form");
const forgotPasswordEmail = document.querySelector(".forgot--password--input");

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/v1/auth/forgot-password", {
      email: forgotPasswordEmail.value,
    });
    window.location.href = "http://localhost:9000/checkEmailPasswordLink";
  } catch (error) {
    console.log(error);
  }
});
