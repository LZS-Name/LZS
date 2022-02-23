import { Request, Response } from "express";
import {
  getThisMonthAnalyticData,
  getThisYearAnalyticData,
} from "../services/analytic";
const express = require("express");
const router = express.Router();

router.post("/data", async (req: Request, res: Response) => {
  try {
    let data;
    if (req.body.method === "monthly") {
      data = await getThisMonthAnalyticData();
    } else {
      data = await getThisYearAnalyticData();
    }
    res.status(201).send({ status: true, data });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
