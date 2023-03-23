require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/notFound-middleware");
const errorHandlerMiddleware = require("./middleware/errorHandler-middleware");

app.use(express.static("./public"));

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
