import * as yup from "yup";

const validationSchema = yup.object({
  applicant_name: yup.string().required("Name is required"),
  IC: yup
    .string()
    .length(12, "IC should be of 12 characters length")
    .required("IC is required"),
  date: yup.string().required("Tarikh is required"),
  family_is_from_MAIS: yup.string().required("This field is required"),
  document: yup.string().required("This field is required"),
});

export default validationSchema;
