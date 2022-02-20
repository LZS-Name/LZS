import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import PageLayout from "../../components/PageLayout";
import BasicSelect from "../../components/SampleForm/Select";
import * as yup from "yup";
import ApplicationTable from "./ApplicationTable";
import { useEffect, useState } from "react";
import Application from "../../models/application.model";

const validationSchema = yup.object({
  application_type: yup.string().nullable(),
  status: yup.string().nullable(),
});

function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/application/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        application_type,
        status,
      }),
    })
      .then((res) => res.json())
      .then((json) => setApplications(json.data));
    fetch("/api/application/conflict-forms")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  const formik = useFormik({
    initialValues: {
      application_type: "ALL",
      status: "ALL",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch("/api/application/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_type,
          status,
        }),
      })
        .then((res) => res.json())
        .then((json) => setApplications(json.data))
        .catch((err) => console.log(err));
      console.log("formValues", values);
    },
  });
  const { application_type, status } = formik.values;
  const { handleChange, handleBlur, handleSubmit } = formik;
  return (
    <PageLayout title={"Dashboard"}>
      <>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={6} xl={4}>
              <BasicSelect
                label="Jenis Permohonan"
                options={[
                  { title: "Semua", value: "ALL" },
                  {
                    title: "BANTUAN SEWA RUMAH ASNAF MUALLAF",
                    value: "BANTUAN SEWA RUMAH ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN PERUBATAN ASNAF MUALLAF",
                    value: "BANTUAN PERUBATAN ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN KEWANGAN BULANAN ASNAF MUALLAF",
                    value: "BANTUAN KEWANGAN BULANAN ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN KEPERLUAN PENDIDIKAN MUALLAF",
                    value: "BANTUAN KEPERLUAN PENDIDIKAN MUALLAF",
                  },
                  {
                    title: "BANTUAN KEPERLUAN HIDUP ASNAF MUALLAF",
                    value: "BANTUAN KEPERLUAN HIDUP ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN HUTANG PERUBATAN ASNAF MUALLAF",
                    value: "BANTUAN HUTANG PERUBATAN ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN DIALISIS ASNAF MUALLAF",
                    value: "BANTUAN DIALISIS ASNAF MUALLAF",
                  },
                  {
                    title: "BANTUAN SEWA RUMAH ASNAF GHARIM",
                    value: "BANTUAN SEWA RUMAH ASNAF GHARIM",
                  },
                ]}
                value={application_type}
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="application_type"
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicSelect
                label="Status"
                options={[
                  { title: "Semua", value: "ALL" },
                  { title: "Lulus", value: "APPROVED" },
                  { title: "Gagal", value: "REJECTED" },
                  {
                    title: "Pending Kelulusan 1",
                    value: "PENDING_FIRST_APPROVAL",
                  },
                  {
                    title: "Pending Kelulusan 2",
                    value: "PENDING_SECOND_APPROVAL",
                  },
                ]}
                value={status}
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="status"
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <Button variant="contained" type="submit">
                Filter
              </Button>
            </Grid>
          </Grid>
        </form>
        <ApplicationTable
          applications={applications}
          application_type={application_type}
          status={status}
        />
      </>
    </PageLayout>
  );
}

export default Dashboard;
