const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

// GET /  → render the tours overview page
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get all tour data from the database
  const tours = await Tour.find();

  // 2) Build the template (views/overview.pug) and send the rendered HTML
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});
