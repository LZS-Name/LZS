const ApplicationConstant = {
  //status
  status: {
    PENDING_FIRST_APPROVAL: "PENDING_FIRST_APPROVAL",
    PENDING_SECOND_APPROVAL: "PENDING_SECOND_APPROVAL",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
  },
  csv_fields: [
    {
      label: "Nama",
      value: "name",
    },
    {
      label: "Nombor K/P",
      value: "ic_number",
    },
    {
      label: "Nama Bank",
      value: "status",
    },
    {
      label: "Nombor Akaun Bank",
      value: "status",
    },
    {
      label: "Jenis Bantuan",
      value: "application_type",
    },
  ],
};

export default ApplicationConstant;
