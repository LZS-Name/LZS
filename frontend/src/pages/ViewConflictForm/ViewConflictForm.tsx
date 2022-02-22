import { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import ConflictForm from "../../components/SampleForm/ConflictForm";
import { useParams } from "react-router-dom";

const ViewConflictForm = () => {
  const { formId } = useParams();
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    fetch(`/api/application/form/conflict/${formId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formId]);

  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {formValues && (
            <ConflictForm formValues={formValues} formId={formId} />
          )}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ViewConflictForm;
