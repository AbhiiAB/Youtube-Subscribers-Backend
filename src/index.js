const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cors = require("cors");
const port = 4000;
const subscriberModel = require("./models/subscribers");
const data = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   cors({
//     origin: ["https://youtube-project-frontend.onrender.com"],
//   })
// );

dotenv.config();
const mongodb = process.env.MONGODB_URI;

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to database..."));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));

// Add data to MongoDB Database
const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
