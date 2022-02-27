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
  additional_document: string;
  application_type: string;
  approval_date?: number;
  first_approver?: string;
  second_approver?: string;
  status?: string;
  bank_name?: string;
  bank_account_no?: string;
  is_asnaf: boolean;
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
      type: String,
    },
    application_type: {
      type: String,
    },
    approval_date: {
      type: Number,
    },
    first_approver: {
      type: String,
    },
    second_approver: {
      type: String,
    },
    status: {
      type: String,
      default: "PENDING_FIRST_APPROVAL",
    },
    bank_name: {
      type: String,
    },
    bank_account_no: {
      type: String,
    },
    is_asnaf: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export { Application, ApplicationInterface };
