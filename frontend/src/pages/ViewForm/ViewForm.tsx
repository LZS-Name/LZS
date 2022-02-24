import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import SampleForm from "../../components/SampleForm";
import { useParams } from "react-router-dom";

const ViewForm = () => {
  const { formId } = useParams();
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetch(`/api/application/form/${formId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SampleForm formValues={formValues} formId={formId} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ViewForm;
