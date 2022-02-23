require("dotenv").config();

import { Analytic, AnalyticInterface } from "../../backend/src/models/Analytic";
import {
  Application,
  ApplicationInterface,
} from "../../backend/src/models/Application";
import application_mock from "../mock_data/application.mock.json";
import analytic_mock from "../mock_data/analytic.mock.json";
const mongoose = require("mongoose");

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error: Error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
db.on("disconnected", () =>
  console.log("Mongoose connection to DB disconnected")
);

//Application
Application.collection.drop();
let applications = application_mock.map((application: ApplicationInterface) => {
  application.approval_date = Date.now();
  return application;
});
Application.insertMany(applications).then(() => {
  // mongoose.disconnect();
});

//Analytic
Analytic.collection.drop();
Analytic.insertMany(analytic_mock).then(() => {
  mongoose.disconnect();
});
