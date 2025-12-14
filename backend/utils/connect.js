const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Error while connecting to MongoDB");
    process.exit(1);
  }
};

module.exports = connectDatabase;
