interface Application {
  _id: string;
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
}

export default Application;
