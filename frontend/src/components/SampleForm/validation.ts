import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Nama diperlukan"),
  ic_number: yup
    .string()
    .length(12, "IC hendaklah sepanjang 12 aksara")
    .required("IC diperlukan"),
  submitter_relationship: yup.string().required("Submitter diperlukan"),
  income: yup.number().moreThan(-1).required("Pandapatan diperlukan"),
  payslip: yup
    .mixed()
    .test("fileSize", "1 PDF file diperlukan", (value) => {
      return value !== undefined;
    })
    .test("fileSize", "File Size is too large", (value) => {
      if (value === undefined) return true;
      return value.size <= 16000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      // for zip the type is application/x-zip-compressed
      if (value === undefined) return true;
      return ["application/pdf"].includes(value.type);
    }),
  marriage_cert: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => {
      // if file not exists
      if (value === undefined) return true;
      return value.size <= 16000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value === undefined) return true;
      return ["application/pdf"].includes(value.type);
    }),
  additional_document: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => {
      // if file not exists
      if (value === undefined) return true;
      return value.size <= 16000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value === undefined) return true;
      return ["application/pdf"].includes(value.type);
    }),
  application_type: yup.string().required("Application Type is required"),
});

export default validationSchema;
