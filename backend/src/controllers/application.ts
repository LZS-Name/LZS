import { Request, Response } from "express";
import {
  approveApplication,
  createApplication,
  getApplicationByFormId,
  getApplicationsBySubmitterId,
  getApplicationByStatusAndApplicationType,
  rejectApplication,
  exportCSV,
  exportSelectedCSV,
} from "../services/application";
import { FileObj } from "../models/FileObj";
import * as path from "path";

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
    cb(null, file.originalname + "-" + Date.now() + ".pdf");
  },
});
const upload = multer({
  storage: storage,
});

// Getting Application by form id
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
      console.log(__dirname);
      console.log("req.body", req.body);
      const newApplication = await createApplication(req.body);
      res
        .status(201)
        .send({ status: true, message: "Created", data: newApplication });
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
);

router.get("/forms/:formId", (req: Request, res: Response) => {
  const formId = req.params.formId;
  console.log("formId", formId);
  const directoryPath = __dirname + "../../../../uploads/";
  const filePath = directoryPath + "test.pdf";
  res.sendFile(path.resolve(filePath));
});

// Getting Filtered Application [ADMIN]
router.post("/filter", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationByStatusAndApplicationType(
      req.body.status,
      req.body.application_type
    );
    return res.status(200).send({ data: [...application] });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Download CSV [ADMIN]
router.post("/download", async (req: Request, res: Response) => {
  try {
    const csv = await exportCSV(req.body.status, req.body.application_type);
    res.header("Content-Type", "text/csv");
    res.attachment("Applications.csv");
    return res.send(csv);
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Download CSV [ADMIN]
router.post("/download-selected", async (req: Request, res: Response) => {
  try {
    const csv = await exportSelectedCSV(req.body.selected);
    res.header("Content-Type", "text/csv");
    res.attachment("Applications.csv");
    return res.send(csv);
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
