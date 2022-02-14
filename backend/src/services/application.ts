import ApplicationConstant from "../constant/application.constant";
import { Application, ApplicationInterface } from "../models/Application";

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

// Admin only
function getApplicationByStatusAndApplicationType(
  status: string,
  application_type: string
) {
  if (status === "ALL" && application_type === "ALL") {
    return Application.find().exec();
  } else if (status === "ALL") {
    return Application.find({ application_type }).exec();
  } else if (application_type === "ALL") {
    return Application.find({ status }).exec();
  }
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
