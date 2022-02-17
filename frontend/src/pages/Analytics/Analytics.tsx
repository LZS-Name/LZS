import { Divider, Grid } from "@mui/material";
import React from "react";
import DataBox from "../../components/DataBox";
import PageLayout from "../../components/PageLayout";
import PieChart from "../../components/PieChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Analytics() {
  return (
    <PageLayout title={"Analytics"}>
      <>
        <Grid container spacing={2}>
          <Grid item xs={4} md={3}>
            <DataBox
              title={"RM 92.6K"}
              description={"Pengagihan"}
              icon={<AttachMoneyIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={"9000"}
              description={"Jumlah Bilangan Transaksi"}
              icon={<ReceiptIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={"RM 92.6K"}
              description={"Jumlah Wang Dikumpulkan"}
              icon={<AccountBalanceIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={"2.5 K"}
              description={"Jumlah Bilangan Asnaf"}
              icon={<PeopleIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6}>
            <PieChart
              icon={{ color: "info", component: "leaderboard" }}
              title="Demografik Penerima"
              description="Lokasi"
              chart={{
                labels: ["Selangor", "Kuala Lumpur"],
                datasets: {
                  label: "Projects",
                  data: [2, 3],
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <PieChart
              icon={{ color: "info", component: "leaderboard" }}
              title="Demografik Penerima"
              description="Jantina"
              chart={{
                labels: ["Lelaki", "Perempuan"],
                datasets: {
                  label: "Projects",
                  data: [2, 3],
                },
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }}>Ramalan</Divider>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <DataBox
              title={"RM 92.6K"}
              description={"Jumlah Bilangan Penerima"}
              icon={<PeopleIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <DataBox
              title={"RM 92.6K"}
              description={"Jumlah Zakat Untuk Individu"}
              icon={<AttachMoneyIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <DataBox
              title={"RM 92.6K"}
              description={"Jumlah Bilangan Penerima Yang Tidak Layak"}
              icon={<PeopleIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
        </Grid>
      </>
    </PageLayout>
  );
}

export default Analytics;
