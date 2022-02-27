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
  changeAsnafStatus,
} from "../services/application";
import runFormRecogniser from "../services/analyse";
import {
  getConflictApplicationById,
  getAllConflictApplications,
  createConflictApplication,
  updateConflictApplication,
} from "../services/conflict";
import { FileObj } from "../models/FileObj";
import * as path from "path";

const express = require("express");
const fs = require("fs");
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
    // cb(null, file.originalname + "-" + Date.now() + ".pdf");
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
const extract = require("extract-zip");

// Get Conflict Form by form id
router.get("/form/conflict/:form_id", async (req: Request, res: Response) => {
  try {
    console.log("getConflictApplicationById, form_id", req.params.form_id);
    const application = await getConflictApplicationById(req.params.form_id);
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

// Download one document from the application
router.get(
  "/form/download/:folderPath/:file",
  (req: Request, res: Response) => {
    try {
      const folderPath = req.params.folderPath;
      const file = req.params.file;
      // console.log("folderPath", folderPath);
      // console.log("file", file);
      const directoryPath = __dirname + "../../../../uploads/";
      const filePath = directoryPath + folderPath + "/" + file;
      res.sendFile(path.resolve(filePath));
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
);
// Download one document from the application
router.get("/form/download/:file", (req: Request, res: Response) => {
  try {
    const file = req.params.file;
    // console.log("folderPath", folderPath);
    // console.log("file", file);
    const directoryPath = __dirname + "../../../../uploads/";
    const filePath = directoryPath + file;
    res.sendFile(path.resolve(filePath));
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Getting Application Detail by form id
router.get("/form/:form_id", async (req: Request, res: Response) => {
  try {
    const application = await getApplicationByFormId(req.params.form_id);
    if (application == null) {
      return res
        .status(404)
        .send({ status: false, message: "Cannot find conflict application" });
    }
    return res.status(200).send({ data: application });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

// Get all conflict application from bulk submission
router.get("/conflict-forms", async (req: Request, res: Response) => {
  try {
    const applications = await getAllConflictApplications();
    return res.status(200).send({ data: applications });
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
// Update one conflict form
router.post("/conflict/update/:formId", async (req: Request, res: Response) => {
  console.log("updating");
  try {
    await updateConflictApplication(req.params.formId, req.body);
    res.status(200).send({ status: true, message: "Updated" });
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
      const newApplication = await createApplication(req.body);
      res
        .status(201)
        .send({ status: true, message: "Created", data: newApplication });
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
);
// Create multiple applications from bulk submission
router.post(
  "/bulk-create",
  upload.any(),
  async (req: Request & { file: any; files: any }, res: Response) => {
    try {
      const path = __dirname + "../../../../uploads/";
      // console.log(req.files);
      const zipFileFileName = req.files[0].filename;
      // unzip
      const folderPath = path + zipFileFileName.split(".")[0];
      await extract(path + zipFileFileName, { dir: folderPath });
      console.log("Extraction complete");
      // save to database
      // console.log(folderPath)
      const files = await fs.promises.readdir(folderPath);
      // console.log("files", files);
      const promises = files.map(async (file: File) => {
        // console.log(file);
        const output = await runFormRecogniser(folderPath + "/" + file);
        return createConflictApplication({
          ...output,
          document: zipFileFileName.split(".")[0] + "/" + file,
        });
      });
      const results = await Promise.all(promises);
      // console.log("results", results);
      res.status(201).send({ status: true, message: "Created" });
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
);

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
    const returnCode = await approveApplication(
      req.body.formId,
      req.body.adminId
    );
    if (returnCode === -1) {
      return res
        .status(404)
        .send({ status: false, message: "Cannot find admin or application" });
    } else if (returnCode === 400) {
      return res
        .status(404)
        .send({ status: false, message: "Cannot perform update operation" });
    } else {
      // await returnCode;
      res.status(200).send({ status: true, message: "Approved" });
    }
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

router.post("/change-asnaf-status", async (req: Request, res: Response) => {
  try {
    await changeAsnafStatus(req.body._id, req.body.is_asnaf);
    res.status(200).send({ status: true, message: "Asnaf status is updated" });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
