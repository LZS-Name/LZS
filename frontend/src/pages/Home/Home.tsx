import React from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import "./Home.scss";
import SampleForm from "../../components/SampleForm";
import BulkSumissionForm from "../../components/SampleForm/BulkSubmissionForm";

const Home = () => {
  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SampleForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <BulkSumissionForm />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
