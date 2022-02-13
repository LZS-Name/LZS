import { Application, ApplicationInterface } from "../models/Application";


function getApplication(submitter_id: string) {
  return Application.find({submitter_id}).exec();
}

function getApplicationByStatusAndApplicationType(status:string, application_type: string) {
  return Application.find({status, application_type}).exec();
}

async function createApplication(applicationInfo: ApplicationInterface) {
    const application = new Application({...applicationInfo});
    try{
        const newApplication = await application.save();
    }catch(err){
        console.log("Error [CREATE USER]: ",err)
    }
}

export {getApplication,getApplicationByStatusAndApplicationType,createApplication}