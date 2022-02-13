import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import BasicSelect from "./Select";
import { useFormik } from "formik";
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
    .array()
    .length(1, "1 file must be uploaded")
    .required("Required")
    .nullable(),
});

const SampleForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "test name",
      ic_number: "111222333444",
      submitter_relationship: "",
      income: 0,
      payslip: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formValues", values);
      fetch("/api/application/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          payslip: "",
          additonal_document: "",
          application_type: "Created by front end",
        }),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log);
    },
  });
  const { name, ic_number, submitter_relationship, income } = formik.values;
  const { handleChange, handleBlur, setFieldValue, touched, errors } = formik;
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: "0.75rem",
        // boxShadow: md,
        p: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="Nama"
              variant="outlined"
              onChange={handleChange}
              value={name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="ic_number"
              name="ic_number"
              label="IC"
              variant="outlined"
              onChange={handleChange}
              value={ic_number}
              error={touched.ic_number && Boolean(errors.ic_number)}
              helperText={touched.ic_number && errors.ic_number}
            />
          </Grid>
          <Grid item xs={12}>
            <BasicSelect
              label="Orang yang menghantar borang ini"
              options={["Sama dengan atas", "Ahli Keluarga/Relatif", "Jiran"]}
              value={submitter_relationship}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="submitter_relationship"
              error={errors["submitter_relationship"]}
              touched={touched["submitter_relationship"]}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="income"
              name="income"
              label="Income"
              variant="outlined"
              onChange={handleChange}
              value={income}
              error={touched.income && Boolean(errors.income)}
              helperText={touched.income && errors.income}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={errors.payslip && touched.payslip ? true : false}
            >
              <Button variant="contained" component="label">
                Muat Naik Slip Gaji
                <input
                  type="file"
                  name="payslip"
                  hidden
                  onChange={(event) => {
                    if (event.target !== null && event.target.files !== null) {
                      const file = event.target.files[0];
                      console.log(file);
                      setFieldValue("payslip", [file]);
                    }
                  }}
                />
              </Button>
              {errors.payslip && touched.payslip && (
                <FormHelperText id="" error={true}>
                  {errors.payslip}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label">
              Muat Naik Sijil Perkahwinan
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label">
              Muat Naik Borang Lain
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Hantar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default SampleForm;
