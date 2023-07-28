const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/v1/auth/register", {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
    window.location.href = "http://localhost:9000/verify";
  } catch (error) {
    console.log(error);
  }
});
