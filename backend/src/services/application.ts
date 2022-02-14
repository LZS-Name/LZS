import ApplicationConstant from "../constant/application.constant";
import { Application, ApplicationInterface } from "../models/Application";
const { Parser } = require("json2csv");

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

function getApplicationBySelectedId(selectedIds: string[]) {
  return Application.find({
    _id: {
      $in: selectedIds,
    },
  }).exec();
}

async function exportCSV(status: string, application_type: string) {
  const applicationData = await getApplicationByStatusAndApplicationType(
    status,
    application_type
  );
  console.log(status);
  console.log(application_type);
  const data = applicationData.map((application) => ({
    ...application.toJSON(),
    ic_number: formatIcNumberWithDashes(application.ic_number),
  }));

  try {
    const json2csv = new Parser({ fields: ApplicationConstant.csv_fields });
    const csv = json2csv.parse(data);
    return csv;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function exportSelectedCSV(selected: string[]) {
  const applicationData = await getApplicationBySelectedId(selected);
  const data = applicationData.map((application) => ({
    ...application.toJSON(),
    ic_number: formatIcNumberWithDashes(application.ic_number),
  }));

  try {
    const json2csv = new Parser({ fields: ApplicationConstant.csv_fields });
    const csv = json2csv.parse(data);
    return csv;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function formatIcNumberWithDashes(ic_number: string) {
  if (!ic_number) return "-";
  return `${ic_number.substring(0, 6)}-${ic_number.substring(
    6,
    8
  )}-${ic_number.substring(8, 12)}`;
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
  exportCSV,
  exportSelectedCSV,
};
