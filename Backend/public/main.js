const createBtn = document.querySelector(".create--account-btn");
const nameInput = document.querySelector(".name-input").value;
const emailInput = document.querySelector(".email-input").value;
const passwordInput = document.querySelector(".password-input").value;
const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await axios.post("/api/v1/auth/register", {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });
    console.log(nameInput, emailInput, passwordInput);
  } catch (error) {
    console.log(error);
  }
});
