import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import BasicSelect from "./Select";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import validationSchema from "./validation";
import FilesSection from "./FilesSection";

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
  const { formId } = useParams();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formValues.name || "test name",
      ic_number: formValues.ic_number || "111222333444",
      submitter_relationship: formValues.submitter_relationship || "SELF",
      income: formValues.income ? parseInt(formValues.income) : 0,
      payslip: undefined,
      marriage_cert: undefined,
      additional_document: undefined,
      application_type: "Created by front end",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formValues", values);
      // construct formData
      const body = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "payslip") {
          body.append("payslipFile", (values as any)[key]);
          body.append(key, (values as any)[key].name);
          return;
        }
        body.append(key, (values as any)[key]);
      });

      fetch("/api/application/create", {
        method: "POST",
        body: body,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          alert("Borang telah dihantar");
        })
        .catch((err) => console.log);
    },
  });

  const onFileSubmit =
    (fieldKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target !== null && event.target.files !== null) {
        const file = event.target.files[0];
        console.log(fieldKey, file);
        setFieldValue(fieldKey, file);
      }
    };

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
          <Grid item xs={12}>
            <TextField
              fullWidth
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
          <FilesSection
            formId={formId}
            formDisabled={formDisabled}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            onFileSubmit={onFileSubmit}
          />
        </Grid>
      </form>
    </Card>
  );
};

export default SampleForm;
