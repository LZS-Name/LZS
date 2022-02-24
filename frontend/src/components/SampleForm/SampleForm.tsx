import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import BasicSelect from "./Select";
import { useFormik } from "formik";
import validationSchema from "./validation";
import FilesSection from "./FilesSection";
import ApplicationModel from "../../models/application.model";
import { useUserContext } from "../../contexts/UserContext";
import { Button, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SampleFormProps {
  formValues:
    | ApplicationModel
    | {
        name?: undefined;
        ic_number?: undefined;
        submitter_relationship?: undefined;
        income?: undefined;
        first_approver?: undefined;
        second_approver?: undefined;
      };
  formId: string | undefined;
}
const SampleForm = ({ formValues = {}, formId }: SampleFormProps) => {
  const formDisabled = formId !== undefined;
  const { userRole } = useUserContext();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formValues.name || "",
      ic_number: formValues.ic_number || "",
      submitter_relationship: formValues.submitter_relationship || "",
      income: formValues.income || 0,
      payslip: undefined,
      marriage_cert: undefined,
      additional_document: undefined,
      application_type: "",
      first_approver: formValues.first_approver || undefined,
      second_approver: formValues.second_approver || undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("formValues", values);
      // construct formData
      const body = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "first_approver" || key === "second_approver") return;
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
          window.location.reload();
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

  const approveApplication = () => {
    if (userRole === "user") return;
    if (formValues.first_approver && formValues.second_approver) return;
    if (window.confirm("Betulkah anda ingin sahkan aplikasi ini?")) {
      const normalAdminId = "6215b519f827f831254406c1";
      const superAdminId = "6215b54df827f831254406c2";
      const adminId = userRole === "admin" ? normalAdminId : superAdminId;
      fetch("/api/application/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId, adminId }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          const { setFieldValue } = formik;
          if (userRole === "admin") {
            setFieldValue("first_approver", adminId);
          } else {
            setFieldValue("second_approver", adminId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const {
    name,
    ic_number,
    submitter_relationship,
    income,
    application_type,
    first_approver,
    second_approver,
  } = formik.values;
  console.log(formik.values);
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
          {first_approver && second_approver && (
            <Grid item xs={12} container justifyContent="flex-end">
              <Chip
                label="Telah Disahkan"
                color="primary"
                icon={<CheckCircleIcon />}
                sx={{ color: "common.white" }}
              />
            </Grid>
          )}
          {userRole === "admin" && first_approver && !second_approver && (
            <Grid item xs={12} container justifyContent="flex-end">
              <Chip
                label="Aplikasi ini perlu disahkan oleh Super Admin"
                color="info"
                variant="outlined"
              />
            </Grid>
          )}
          {userRole === "super_admin" && !first_approver && (
            <Grid item xs={12} container justifyContent="flex-end">
              <Chip
                label="Aplikasi ini perlu disahkan oleh Admin Biasa"
                color="info"
                variant="outlined"
              />
            </Grid>
          )}
          {userRole === "super_admin" && first_approver && !second_approver && (
            <Grid item xs={12} container justifyContent="flex-end">
              <Chip
                label="Aplikasi ini telah disahkan oleh Admin Biasa"
                color="info"
                variant="outlined"
              />
            </Grid>
          )}
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
              fullWidth
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
              fullWidth
              id="income"
              name="income"
              label="Pendapatan"
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
              fullWidth
              id="application_type"
              name="application_type"
              label="Jenis Aplikasi"
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
            approveApplication={approveApplication}
          />
          {formDisabled && formValues ? (
            <>
              {((!first_approver && userRole === "admin") ||
                (!second_approver &&
                  first_approver &&
                  userRole === "super_admin")) && (
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    type="button"
                    onClick={approveApplication}
                  >
                    Sahkan
                  </Button>
                </Grid>
              )}
            </>
          ) : (
            <Grid item xs={12} container justifyContent="flex-end">
              <Button variant="contained" type="submit" disabled={formDisabled}>
                Hantar
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Card>
  );
};

export default SampleForm;
