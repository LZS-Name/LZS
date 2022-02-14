import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import BasicSelect from "./Select";
import { useFormik } from "formik";
import validationSchema from "./validation";

interface SampleFormProps {
  formValues: {
    name?: string;
    ic_number?: string;
    submitter_relationship?: string;
    income?: string;
  };
}
const SampleForm = ({ formValues = {} }: SampleFormProps) => {
  const formDisabled = Object.keys(formValues).length !== 0;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formValues.name || "test name",
      ic_number: formValues.ic_number || "111222333444",
      submitter_relationship: formValues.submitter_relationship || "SELF",
      income: formValues.income ? parseInt(formValues.income) : 0,
      payslip: {},
      additional_document: {},
      application_type: "Created by front end",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formValues", values);
      // construct formData
      const body = new FormData();
      Object.keys(values).forEach((key) => {
        body.append(key, (values as any)[key]);
      });

      fetch("/api/application/create", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   ...values,
        // }),
        body: body,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log);
    },
  });
  const { name, ic_number, submitter_relationship, income, application_type } =
    formik.values;
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = formik;
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              disabled={formDisabled}
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
              disabled={formDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <BasicSelect
              label="Orang yang menghantar borang ini"
              options={[
                { title: "Sama dengan atas", value: "SELF" },
                { title: "Ahli Keluarga/Relatif", value: "FAMILY_RELATIVE" },
                { title: "Jiran", value: "NEIGHBOUR" },
              ]}
              value={submitter_relationship}
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="submitter_relationship"
              error={errors["submitter_relationship"]}
              touched={touched["submitter_relationship"]}
              disabled={formDisabled}
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
              disabled={formDisabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="application_type"
              name="application_type"
              label="Application Type"
              variant="outlined"
              onChange={handleChange}
              value={application_type}
              error={
                touched.application_type && Boolean(errors.application_type)
              }
              helperText={touched.application_type && errors.application_type}
              disabled={formDisabled}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={errors.payslip && touched.payslip ? true : false}
            >
              <Button
                variant="contained"
                component="label"
                disabled={formDisabled}
              >
                Muat Naik Slip Gaji
                <input
                  type="file"
                  // accept="application/pdf"
                  name="payslip"
                  hidden
                  onChange={(event) => {
                    if (event.target !== null && event.target.files !== null) {
                      const file = event.target.files[0];
                      console.log(file);
                      setFieldValue("payslip", file);
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
            <Button
              variant="contained"
              component="label"
              disabled={formDisabled}
            >
              Muat Naik Sijil Perkahwinan
              <input type="file" hidden accept="application/pdf" />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={errors.payslip && touched.payslip ? true : false}
            >
              <Button
                variant="contained"
                component="label"
                disabled={formDisabled}
              >
                Muat Naik Borang Lain
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  name="additional_document"
                  onChange={(event) => {
                    if (event.target !== null && event.target.files !== null) {
                      const file = event.target.files[0];
                      console.log(file);
                      setFieldValue("additional_document", file);
                    }
                  }}
                />
              </Button>
              {errors.additional_document && touched.additional_document && (
                <FormHelperText id="" error={true}>
                  {errors.additional_document}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button variant="contained" type="submit" disabled={formDisabled}>
              Hantar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default SampleForm;
