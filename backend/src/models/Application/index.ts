import mongoose from 'mongoose'

interface ApplicationInterface {
  // id: string,
  name: string,
  ic_number: string,
  submitter_id: string,
  submitter_relationship: string,
  income: number,
  payslip: string,
  marriage_cert?: string,
  additional_document: string,
  application_type: string,
  approval_date?: string,
  first_approver?: string,
  second_approver?: string,
  status?: string,
}

const applicationSchema = new mongoose.Schema<ApplicationInterface>({
  // id: { 
  //   type: String, 
  //   unique: true
  // },
  name: { 
    type: String, 
  },
  ic_number: { 
    type: String, 
  },
  submitter_id: { 
    type: String, 
  },
  submitter_relationship: { 
    type: String, 
  },
  income: { 
    type: Number, 
  },
  payslip: { 
    type: String, 
  },
  marriage_cert: { 
    type: String, 
  },
  additional_document: { 
    type: String, 
  },
  application_type: { 
    type: String, 
  },
  approval_date: {
    type: String, 
  },
  first_approver: {
    type: String, 
  },
  second_approver: {
    type: String, 
  },
  status: { 
    type: String, 
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export {Application, ApplicationInterface};