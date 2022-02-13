import ApplicationConstant from "../constant/application.constant";
import { Application, ApplicationInterface } from "../models/Application";


function getApplication(submitter_id: string) {
  return Application.find({submitter_id}).exec();
}


async function createApplication(applicationInfo: ApplicationInterface) {
  const application = new Application({...applicationInfo});
  try{
    await application.save();
  }catch(err){
    console.log("Error [CREATE USER]: ",err)
  }
}

// Admin only
function getApplicationByStatusAndApplicationType(status:string, application_type: string) {
  return Application.find({status, application_type}).exec();
}

async function approveApplication(_id: string, adminId: string){
  const application = await Application.findById(_id).exec();
  let status;
  if(application?.first_approver===adminId){
    status = ApplicationConstant.status.PENDING_SECOND_APPROVAL;
  }else{
    status = ApplicationConstant.status.APPROVED;
  }
  return Application.updateOne({_id},{status})
}

function rejectApplication(_id: string){
  return Application.updateOne({_id},{status: ApplicationConstant.status.REJECTED});
}

export {getApplication,getApplicationByStatusAndApplicationType,createApplication,approveApplication,rejectApplication}