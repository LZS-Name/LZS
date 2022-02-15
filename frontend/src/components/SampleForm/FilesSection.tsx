import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { FormikErrors, FormikTouched } from "formik";
import ApplicationModel from "../../models/application.model";

interface FilesSectionProps {
  formId: string | undefined;
  formDisabled: boolean;
  errors: FormikErrors<ApplicationModel>;
  touched: FormikTouched<ApplicationModel>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<ApplicationModel>>;
  onFileSubmit: (
    fieldKey: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FilesSection = ({
  formId,
  formDisabled,
  errors,
  touched,
  setFieldValue,
  onFileSubmit,
}: FilesSectionProps) => {
  // if admin viewing the form
  if (formDisabled) {
    return (
      <>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => {
              fetch(`/api/application/form/download-${formId}`)
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
              accept="application/pdf"
              name="payslip"
              hidden
              onChange={onFileSubmit("payslip")}
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
          <input
            type="file"
            hidden
            accept="application/pdf"
            name="marriage_cert"
            onChange={onFileSubmit("marriage_cert")}
          />
        </Button>
        {errors.marriage_cert && touched.marriage_cert && (
          <FormHelperText id="" error={true}>
            {errors.marriage_cert}
          </FormHelperText>
        )}
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
              onChange={onFileSubmit("additional_document")}
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
