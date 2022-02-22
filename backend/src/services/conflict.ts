import {
  ConflictApplication,
  ConflictApplicationInterface,
} from "../models/Application/conflict";

async function getConflictApplicationById(_id: string) {
  return ConflictApplication.findById(_id).exec();
}
function getAllConflictApplications() {
  return ConflictApplication.find().exec();
}

async function createConflictApplication(
  applicationInfo: ConflictApplicationInterface
) {
  const application = new ConflictApplication({ ...applicationInfo });
  try {
    return await application.save();
  } catch (err) {
    console.log("Error [CREATE CONFLICT APPLICATION]: ", err);
    throw err;
  }
}
async function updateConflictApplication(
  _id: string,
  update: ConflictApplicationInterface
) {
  try {
    const application = await ConflictApplication.findOneAndUpdate(
      { _id: _id },
      update
    );
  } catch (err) {
    console.log("Error [CREATE CONFLICT APPLICATION]: ", err);
    throw err;
  }
}

export {
  getConflictApplicationById,
  getAllConflictApplications,
  createConflictApplication,
  updateConflictApplication,
};
