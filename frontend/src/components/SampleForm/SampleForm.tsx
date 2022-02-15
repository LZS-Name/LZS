import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import BasicSelect from "./Select";
import { useFormik } from "formik";
import validationSchema from "./validation";
import FilesSection from "./FilesSection";
import ApplicationModel from "../../models/application.model";

interface SampleFormProps {
  formValues:
    | ApplicationModel
    | {
        name?: undefined;
        ic_number?: undefined;
        submitter_relationship?: undefined;
        income?: undefined;
      };
  formId: string | undefined;
}
const SampleForm = ({ formValues = {}, formId }: SampleFormProps) => {
  const formDisabled = formId !== undefined;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formValues.name || "test name",
      ic_number: formValues.ic_number || "111222333444",
      submitter_relationship: formValues.submitter_relationship || "SELF",
      income: formValues.income || 0,
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
        // let backend get the field as key + datetime + file name
        const value = (values as any)[key];
        if (
          value &&
          (key === "payslip" ||
            key === "marriage_cert" ||
            key === "additional_document")
        ) {
          const fileName =
            key + "-" + Date.now() + "-" + (values as any)[key].name;
          const newFile = new File([value], fileName, { type: value.type });
          console.log("edited", newFile);
          body.append(key + "File", newFile);
          body.append(key, fileName);
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
          alert("Borang telah dihantar");
        })
        .catch((err) => console.log);
    },
  });

  const onFileSubmit =
    (fieldKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target !== null && event.target.files !== null) {
        const file = event.target.files[0];
        // console.log(fieldKey, file);
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
            formValues={formValues as ApplicationModel}
            formDisabled={formDisabled}
            errors={errors}
            touched={touched}
            onFileSubmit={onFileSubmit}
          />
        </Grid>
      </form>
    </Card>
  );
};

export default SampleForm;
