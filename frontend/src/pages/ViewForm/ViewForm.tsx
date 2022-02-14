import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import SampleForm from "../../components/SampleForm";
import { useParams } from "react-router-dom";

const ViewForm = () => {
  const { formId } = useParams();
  const [formValues, setFormValues] = useState({});
  // fetch(`/api/application/form/${formId}`)
  useEffect(() => {
    fetch("/api/application/form/6208b395415b0a8c87e40c58")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SampleForm formValues={formValues} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ViewForm;