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
import { useState } from "react";

interface SampleFormProps {
  formValues: ConflictApplication;
  formId: string | undefined;
}
const ConflictForm = ({ formValues, formId }: SampleFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicant_name: formValues.applicant_name,
      IC: formValues.IC,
      date: formValues.date,
      family_is_from_MAIS: formValues.family_is_from_MAIS,
      document: formValues.document,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // submit to update form
      console.log("formValues", values);
      // construct formData
      console.log(JSON.stringify(values));

      fetch(`/api/application/conflict/update/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("Borang telah dihantar");
        })
        .catch((err) => console.log);
    },
  });
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

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
              disabled={!editing}
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
              disabled={!editing}
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
              disabled={!editing}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl disabled={!editing}>
              <FormLabel id="demo-radio-buttons-group-label">
                Adakah anda (pemohon) mempunyai hubungan kekeluargaan denga
                kakitangan Lembaga Zakat Selangor (MAIS)?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={family_is_from_MAIS}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="selected"
                  control={<Radio />}
                  label="Ya"
                />
                <FormControlLabel
                  value="unselected"
                  control={<Radio />}
                  label="Tidak"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-start">
            <Button
              variant="contained"
              onClick={() =>
                downloadFile(
                  `${formValues.document}`,
                  formValues.document.split("/")[1]
                )
              }
            >
              Muat Turun File
            </Button>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={toggleEditing}
              type={editing ? "button" : "submit"}
            >
              {editing ? "Hantar" : "Edit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default ConflictForm;
