import mongoose from "mongoose";

interface ApplicationInterface {
  // id: string,
  name: string;
  ic_number: string;
  submitter_id: string;
  submitter_relationship: string;
  income: number;
  payslip: string;
  marriage_cert?: string;
  additional_document: Buffer;
  application_type: string;
  approval_date?: string;
  first_approver?: string;
  second_approver?: string;
  status?: string;
}

const applicationSchema = new mongoose.Schema<ApplicationInterface>(
  {
    // id: {
    //   type: String,
    //   unique: true
    // },
    name: {
      type: String,
      required: true,
    },
    ic_number: {
      type: String,
      required: true,
    },
    submitter_id: {
      type: String,
    },
    submitter_relationship: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    payslip: {
      type: String,
      required: true,
    },
    marriage_cert: {
      type: String,
    },
    additional_document: {
      type: Buffer,
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
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export { Application, ApplicationInterface };
