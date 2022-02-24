const express = require("express");
const router = express.Router();
const applicationRouter = require("./application");
const analyticRouter = require("./analytic");
const forecastRouter = require("./forecast");

// Getting all
router.use("/application/", applicationRouter);
router.use("/analytic/", analyticRouter);
router.use("/forecast/", forecastRouter);

module.exports = router;
