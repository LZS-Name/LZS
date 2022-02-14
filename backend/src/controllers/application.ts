import { Request, Response } from "express";
import {
  approveApplication,
  createApplication,
  getApplicationByFormId,
  getApplicationsBySubmitterId,
  getApplicationByStatusAndApplicationType,
  rejectApplication,
} from "../services/application";
import { FileObj } from "../models/FileObj";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: FileObj,
    cb: (error: Error | null, filePath: string) => {}
  ) {
    cb(null, "./uploads/");
  },
  filename: function (
    req: Request,
    file: FileObj,
    cb: (error: Error | null, fileName: string) => {}
  ) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, file.originalname + "-" + Date.now() + ".pdf");
  },
});
const upload = multer({
  // dest: "uploads/",
  storage: storage,
});

// Getting Application by sumitter id
router.get("/form/:form_id", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationByFormId(req.params.form_id);
    if (application == null) {
      return res
        .status(404)
        .send({ status: false, message: "Cannot find application" });
    }
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
router.post(
  "/create",
  upload.any(),
  async (req: Request & { file: any; files: any }, res: Response) => {
    try {
      console.log("req.body", req.body);
      console.log("req.files", req.files);
      const newApplication = createApplication(req.body);
      res
        .status(201)
        .send({ status: true, message: "Created", data: newApplication });
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
);

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
