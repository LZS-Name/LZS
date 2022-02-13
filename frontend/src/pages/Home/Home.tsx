import React from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import "./Home.scss";
import SampleForm from "../../components/SampleForm";

const Home = () => {
  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SampleForm />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
