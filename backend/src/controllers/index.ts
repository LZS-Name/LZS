const express = require("express");
const router = express.Router();
const applicationRouter = require("./application");
const analyticRouter = require("./analytic");

// Getting all
router.use("/application/", applicationRouter);
router.use("/analytic/", analyticRouter);

module.exports = router;
