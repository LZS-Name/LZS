const formidable = require("formidable");

import ApplicationConstant from "../constant/application.constant";
import { Application, ApplicationInterface } from "../models/Application";
import { FileObj } from "../models/FileObj";

async function getApplicationByFormId(form_id: string) {
  return Application.findById(form_id).exec();
}
function getApplicationsBySubmitterId(submitter_id: string) {
  return Application.find({ submitter_id }).exec();
}

async function createApplication(applicationInfo: ApplicationInterface) {
  const application = new Application({ ...applicationInfo });
  try {
    return await application.save();
  } catch (err) {
    console.log("Error [CREATE USER]: ", err);
    throw err;
  }
}

async function saveFile(fileObj: File) {
  return new Promise((resolve, reject) => {
    // var form = new formidable.IncomingForm();

    // form.parse(fileObj);

    // form.on("fileBegin", function (name: any, file: File & FileObj) {
    //   console.log("__dirname", __dirname);
    //   file.path = __dirname + "\\uploads\\" + file.originalname;
    //   file.filename = file.originalname;
    //   file.filepath = __dirname + "\\uploads\\" + file.originalname;
    // });

    // form.on("file", function (name: any, file: File & FileObj) {
    //   // console.log(file)
    //   console.log("Uploaded " + file.originalname);
    //   // console.log('path ' + file.path);
    //   console.log("filepath " + file.filepath);
    //   resolve("Uploaded " + file.originalname);
    // });
    resolve("test");
  });
}

// Admin only
function getApplicationByStatusAndApplicationType(
  status: string,
  application_type: string
) {
  return Application.find({ status, application_type }).exec();
}

async function approveApplication(_id: string, adminId: string) {
  const application = await Application.findById(_id).exec();
  let status;
  if (application?.first_approver === adminId) {
    status = ApplicationConstant.status.PENDING_SECOND_APPROVAL;
  } else {
    status = ApplicationConstant.status.APPROVED;
  }
  return Application.updateOne({ _id }, { status });
}

function rejectApplication(_id: string) {
  return Application.updateOne(
    { _id },
    { status: ApplicationConstant.status.REJECTED }
  );
}

export {
  getApplicationByFormId,
  getApplicationsBySubmitterId,
  getApplicationByStatusAndApplicationType,
  createApplication,
  approveApplication,
  rejectApplication,
};
