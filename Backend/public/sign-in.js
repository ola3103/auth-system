const signInForm = document.querySelector(".sign--in--form");
const signInEmail = document.querySelector(".sign--in--email-input");
const signInPassword = document.querySelector(".sign--in--password-input");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Sign In Clicked");
  try {
    const response = await axios.post("/api/v1/auth/sign-in", {
      email: signInEmail.value,
      password: signInPassword.value,
    });
    console.log(response.status);
    if (response.status == 200) {
      window.location.href = "http://localhost:9000/userdashboard";
    }
  } catch (error) {
    console.log(error);
  }
});
