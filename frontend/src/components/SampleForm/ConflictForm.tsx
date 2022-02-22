import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useFormik } from "formik";
import validationSchema from "./validation";
import ConflictApplication from "../../models/conflict.model";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import downloadFile from "../../utils/downloadFile";

interface SampleFormProps {
  formValues: ConflictApplication;
  formId: string | undefined;
}
const ConflictForm = ({ formValues, formId }: SampleFormProps) => {
  const formDisabled = formId !== undefined;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicant_name: formValues.applicant_name,
      IC: formValues.IC,
      date: formValues.date,
      family_is_from_MAIS: formValues.family_is_from_MAIS,
      document: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // submit to update form
      console.log("formValues", values);
      // construct formData
      const body = new FormData();

      fetch("/api/application/conflict/update", {
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

  const {
    applicant_name: name,
    IC: ic_number,
    date,
    family_is_from_MAIS,
  } = formik.values;
  const { handleChange, handleSubmit, touched, errors } = formik;
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
              name="applicant_name"
              label="Nama"
              variant="outlined"
              onChange={handleChange}
              value={name}
              error={touched.applicant_name && Boolean(errors.applicant_name)}
              helperText={touched.applicant_name && errors.applicant_name}
              disabled={formDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="IC"
              label="IC"
              variant="outlined"
              onChange={handleChange}
              value={ic_number}
              error={touched.IC && Boolean(errors.IC)}
              helperText={touched.IC && errors.IC}
              disabled={formDisabled}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="date"
              label="Tarikh"
              variant="outlined"
              onChange={handleChange}
              value={date}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
              disabled={formDisabled}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={family_is_from_MAIS}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="selected"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="unselected"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() =>
                downloadFile(
                  `/api/application/form/download/${formValues.document}`,
                  formValues.document.split("/")[1]
                )
              }
            >
              Muat Turun File
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default ConflictForm;
