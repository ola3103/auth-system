// document.addEventListener("DOMContentLoaded", function () {
//   const createBtn = document.querySelector(".create--account-btn");
//   const nameInput = document.querySelector(".name-input");
//   const emailInput = document.querySelector(".email-input");
//   const passwordInput = document.querySelector(".password-input");
//   const emailSignIn = document.querySelector(".sign--in--email-input");
//   const passwordSignIn = document.querySelector(".sign--in--password-input");
//   const registerForm = document.querySelector(".register-form");
//   const signInForm = document.querySelector(".sign--in--form");
//   const signInBtn = document.querySelector(".sign--in-btn");

//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/v1/auth/register", {
//         name: nameInput.value,
//         email: emailInput.value,
//         password: passwordInput.value,
//       });
//       console.log(nameInput.value, emailInput.value, passwordInput.value);
//       window.location.href = "http://localhost:9000/verify";
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   signInForm.addEventListener("submit", async function (e) {
//     e.preventDefault();
//     console.log("goal");
//     // try {
//     //   await axios.post("/api/v1/auth/sign-in", {
//     //     email: emailSignIn.value,
//     //     password: passwordInput.value,
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   });
// });

const testBtn = document.querySelector(".regTest");
const testReg = document.querySelector(".register--btn");
const testSignIn = document.querySelector(".sign--in-btn");

testBtn.addEventListener("click", function () {
  console.log("clicked");
});

testReg.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Registered");
});

window.addEventListener("DOMContentLoaded", function () {
  if (testSignIn) {
    testSignIn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Test sign in");
    });
  }
});
