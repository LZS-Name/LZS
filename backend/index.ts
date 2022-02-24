require("dotenv").config();
import { Application } from "express";
const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./src/controllers");
const path = require("path");

const app: Application = express();
const port = process.env.PORT || 3001;

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error: Error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
db.on("disconnected", () =>
  console.log("Mongoose connection to DB disconnected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", apiRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
