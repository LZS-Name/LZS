import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import PageLayout from "../../components/PageLayout";
import BasicSelect from "../../components/SampleForm/Select";
import * as yup from "yup";
import ApplicationTable from "./ApplicationTable";
import ConflictApplicationTable from "./ConflictApplicationTable";
import Application from "../../models/application.model";
import ConflictApplicationData from "../../models/conflict.model";

import ApplicationSelector from "./ApplicationSelector";
import routes from "../routes";
import statusConstant from "../../constant/status.constant";

const formKey = {
  registration: "registration",
  conflict: "conflict",
};
const formMap = {
  registration: routes.dashboard.replace(":formType", formKey.registration),
  conflict: routes.dashboard.replace(":formType", formKey.conflict),
};

const validationSchema = yup.object({
  application_type: yup.string().nullable(),
  status: yup.string().nullable(),
});

function Dashboard() {
  const location = useLocation();
  const [applications, setApplications] = useState<
    Application[] | ConflictApplicationData[]
  >([]);

  useEffect(() => {
    // TODO: not efficient, can save in state and add a refresh button
    if (location.pathname.startsWith(formMap.registration)) {
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
    } else if (location.pathname.startsWith(formMap.conflict)) {
      fetch("/api/application/conflict-forms")
        .then((res) => res.json())
        .then((json) => setApplications(json.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
        <Grid px={2} py={1} pb={2}>
          <ApplicationSelector formKey={formKey} formMap={formMap} />
        </Grid>
        {location.pathname.startsWith(
          routes.dashboard.replace(":formType", "registration")
        ) ? (
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
                    options={statusConstant.options}
                    value={status}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    name="status"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Button variant="contained" type="submit">
                    Tapis
                  </Button>
                </Grid>
              </Grid>
            </form>

            <ApplicationTable
              applications={applications as unknown as Application[]}
              application_type={application_type}
              status={status}
            />
          </>
        ) : (
          <ConflictApplicationTable
            applications={applications as unknown as ConflictApplicationData[]}
          />
        )}
      </>
    </PageLayout>
  );
}

export default Dashboard;
