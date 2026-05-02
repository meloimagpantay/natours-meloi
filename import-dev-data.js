const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require("./models/tourModel");
const Review = require("./models/reviewModel");
const User = require("./models/userModel");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);
console.log(DB);
mongoose.connect(DB).then(() => {
  console.log("DB connected succesfully!");
});
// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(
    // `${__dirname}/starter/dev-data/data/tours-simple.json`,
    `${__dirname}/starter/dev-data/data/tours.json`,
    "utf-8",
  ),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/users.json`, "utf-8"),
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/reviews.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
