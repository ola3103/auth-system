require("dotenv").config();
require("express-async-errors");
require("./connect/connectDB");

const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const notFoundMiddleware = require("./middleware/notFound-middleware");
const errorHandlerMiddleware = require("./middleware/errorHandler-middleware");

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/register", (req, res) => {
  res.sendFile("./public/register.html", { root: __dirname });
});

app.get("/sign-in", (req, res) => {
  res.sendFile("./public/sign-in.html", { root: __dirname });
});

app.get("/forgot-password", (req, res) => {
  res.sendFile("./public/forgot-password.html", { root: __dirname });
});

app.get("/verify", (req, res) => {
  res.sendFile("./public/verify-email.html", { root: __dirname });
});

async function postData(queryData, backendURL) {
  try {
    const response = await axios.post(backendURL, {
      data: queryData,
    });
  } catch (error) {
    console.log(error);
  }
}
app.get("/verify-email", (req, res) => {
  const tokenEmail = {
    tokenV: req.query.token,
    emailV: req.query.email,
  };
  const backendURL = "http://localhost:9000/api/v1/auth/verify-email";
  postData(tokenEmail, backendURL);
  res.sendFile("./public/email-verification-successful.html", {
    root: __dirname,
  });
});
app.get("/userdashboard", (req, res) => {
  res.sendFile("./public/user-homepage.html", { root: __dirname });
});

app.get("/checkEmailPasswordLink", (req, res) => {
  res.sendFile("./public/check-email-passwordLink.html", { root: __dirname });
});

app.get("/passwordResetSuccessful", (req, res) => {
  res.sendFile("./public/passwordResetSuccessful.html", { root: __dirname });
});

app.get("/reset-password", (req, res) => {
  const resetPasswordQuery = {
    email: req.query.email,
    token: req.query.token,
  };
  const backendURL = "http://localhost:9000/api/v1/auth/reset-password";
  postData(resetPasswordQuery, backendURL);
  res.sendFile("./public/reset-password.html", { root: __dirname });
});

app.use("/api/v1/auth", authRouter);
app.use("/user", userRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
