require("dotenv").config();
require("express-async-errors");
require("./connect/connectDB");

const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require("./routes/auth-routes");
const notFoundMiddleware = require("./middleware/notFound-middleware");
const errorHandlerMiddleware = require("./middleware/errorHandler-middleware");

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.get("/register", (req, res) => {
  res.sendFile("./public/register.html", { root: __dirname });
});

app.get("/sign-in", (req, res) => {
  res.sendFile("./public/sign-in.html", { root: __dirname });
});

app.get("/forgot-password", (req, res) => {
  res.sendFile("./public/forgot-password.html", { root: __dirname });
});

app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
