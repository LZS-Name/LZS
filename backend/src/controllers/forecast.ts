import { Request, Response } from "express";
import { getForecastData, createForecastResult } from "../services/forecast";
const express = require("express");
const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    let data = await createForecastResult(req.body);
    res.status(201).send({ status: true, message: "Created", data });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});
router.get("/data", async (req: Request, res: Response) => {
  try {
    let data = await getForecastData();
    res.status(200).send({ status: true, data });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
