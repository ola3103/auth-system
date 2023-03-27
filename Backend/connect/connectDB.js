const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

module.exports = mongoose;
