import { Request, Response } from "express";
import { getForecastData } from "../services/forecast";
const express = require("express");
const router = express.Router();

router.get("/data", async (req: Request, res: Response) => {
  try {
    let data = await getForecastData();
    res.status(200).send({ status: true, data });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
