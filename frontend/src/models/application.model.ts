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
  approval_date?: string;
  first_approver?: string;
  second_approver?: string;
  status?: string;
}

export default Application;
