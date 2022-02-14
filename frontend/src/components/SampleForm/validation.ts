import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  ic_number: yup
    .string()
    .length(12, "IC should be of 12 characters length")
    .required("IC is required"),
  submitter_relationship: yup.string().required("Submitter is required"),
  income: yup.number().moreThan(-1).required("Income is required"),
  payslip: yup
    .mixed()
    .test("fileSize", "1 PDF file is required", (value) => value !== undefined)
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value.size <= 16000000
    )
    .test("fileType", "Unsupported File Format", (value) =>
      ["application/pdf"].includes(value.type)
    ),
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
