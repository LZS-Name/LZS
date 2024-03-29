import React from "react";
import PageLayout from "../../components/PageLayout";
import Grid from "@mui/material/Grid";
import SampleForm from "../../components/SampleForm";

const HomeAdmin = () => {
  // fetch('http://localhost:3001/api/application/string1').then(res => {
  fetch("/api/application/string1")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <PageLayout title={"Borang Aplikasi"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SampleForm />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default HomeAdmin;
