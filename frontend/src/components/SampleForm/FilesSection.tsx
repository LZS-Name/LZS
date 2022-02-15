import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { FormikErrors, FormikTouched } from "formik";
import ApplicationModel from "../../models/application.model";

interface FilesSectionProps {
  formDisabled: boolean;
  errors: FormikErrors<ApplicationModel>;
  touched: FormikTouched<ApplicationModel>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<ApplicationModel>>;
}
const FilesSection = ({
  formDisabled,
  errors,
  touched,
  setFieldValue,
}: FilesSectionProps) => {
  // if admin viewing the form
  if (formDisabled) {
    return (
      <>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => {
              fetch("/api/application/form/10")
                .then((x) => x.blob())
                .then((b) => {
                  const url = window.URL.createObjectURL(b);
                  var a = document.createElement("a");
                  document.body.appendChild(a);
                  a.href = url;
                  a.download = "a.pdf";
                  a.click();
                })
                .catch((err) => console.log);
            }}
          >
            Download
          </Button>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          error={errors.payslip && touched.payslip ? true : false}
        >
          <Button variant="contained" component="label" disabled={formDisabled}>
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
        <Button variant="contained" component="label" disabled={formDisabled}>
          Muat Naik Sijil Perkahwinan
          <input type="file" hidden accept="application/pdf" />
        </Button>
      </Grid>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          error={errors.payslip && touched.payslip ? true : false}
        >
          <Button variant="contained" component="label" disabled={formDisabled}>
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
    </>
  );
};

export default FilesSection;
