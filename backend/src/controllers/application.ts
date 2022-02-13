const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import {
  approveApplication,
  createApplication,
  getApplicationByFormId,
  getApplicationsBySubmitterId,
  getApplicationByStatusAndApplicationType,
  rejectApplication,
} from "../services/application";

// Getting Application by sumitter id
router.get("/form/:form_id", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationByFormId(req.params.form_id);
    return res.status(200).send({ data: application });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Getting Application by sumitter id
router.get("/:submitter_id", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationsBySubmitterId(
      req.params.submitter_id
    );
    return res.status(200).send({ data: application });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Creating one
router.post("/create", async (req: Request, res: Response) => {
  try {
    const newApplication = createApplication(req.body);
    res.status(200).send({ status: true, message: "Created" });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Getting Filtered Application [ADMIN]
router.get("/filter", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationByStatusAndApplicationType(
      req.body.status,
      req.body.applicationType
    );
    return res.status(200).send({ data: { ...application } });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Approve Application [ADMIN]
router.post("/approve", async (req: Request, res: Response) => {
  try {
    approveApplication(req.body._id, req.body.adminId);
    res.status(200).send({ status: true, message: "Approved" });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Reject Application [ADMIN]
router.post("/reject", async (req: Request, res: Response) => {
  try {
    rejectApplication(req.body._id);
    res.status(200).send({ status: true, message: "Rejected" });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
