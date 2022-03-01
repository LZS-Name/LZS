import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import * as yup from "yup";
import { Backdrop, CircularProgress } from "@mui/material";

const validationSchema = yup.object({
  forms: yup
    .mixed()
    .test("fileSize", "1 PDF file is required", (value) => {
      return value !== undefined;
    })
    .test("fileSize", "File Size is too large", (value) => {
      if (value === undefined) return true;
      return value.size <= 16000000;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value === undefined) return true;
      return ["application/x-zip-compressed"].includes(value.type);
    }),
});

const BulkSumissionForm = () => {
  const formik = useFormik({
    initialValues: {
      forms: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("formValues", values);
      // construct formData
      const body = new FormData();
      Object.keys(values).forEach((key) => {
        // let backend get the field as key + datetime + file name
        const value = (values as any)[key];
        if (value && key === "forms") {
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
      setLoading(true);
      fetch("/api/application/bulk-create", {
        method: "POST",
        body: body,
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.status && res.message === "File in zip must be PDF") {
            alert("Borang dalam zip mestilah PDF");
          } else if (!res.status) {
            throw new Error("unknown error from server side");
          } else {
            alert("Borang-borang telah dihantar");
          }
        })
        .catch((err) => {
          alert("Sila cuba hantar borang sekali lagi");
          console.log(err);
        })
        .finally(() => setLoading(false));
    },
  });
  const [loading, setLoading] = useState(false);

  const onFileSubmit =
    (fieldKey: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target !== null && event.target.files !== null) {
        const file = event.target.files[0];
        // console.log(fieldKey, file);
        setFieldValue(fieldKey, file);
      }
    };

  const { handleSubmit, setFieldValue, touched, errors } = formik;
  return (
    <Card
      sx={{
        // height: "100%",
        bgcolor: "background.paper",
        borderRadius: "0.75rem",
        // boxShadow: md,
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={errors.forms && touched.forms ? true : false}
            >
              <Button variant="contained" component="label">
                Muat Naik Borang-borang
                <input
                  type="file"
                  accept=".zip,.rar,.7zip"
                  name="forms"
                  hidden
                  onChange={onFileSubmit("forms")}
                />
              </Button>
              {errors.forms && touched.forms && (
                <FormHelperText id="" error={true}>
                  {errors.forms}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Hantar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
};

export default BulkSumissionForm;
