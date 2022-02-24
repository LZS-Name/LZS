import { Divider, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataBox from "../../components/DataBox";
import PageLayout from "../../components/PageLayout";
import PieChart from "../../components/PieChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HttpResponseModel from "../../models/http-response.model";
import AnalyticInterface from "../../models/analytic.model";
import ForecastResultInterface from "../../models/forecast.model";

function Analytics() {
  const [analyticData, setAnalyticData] = useState<AnalyticInterface>();
  const [forecastData, setForecastData] = useState<ForecastResultInterface>();
  const [method, setMethod] = useState<string>("yearly");

  useEffect(() => {
    fetchAnalyticData();
    fetchForecastData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMethod: string
  ) => {
    setMethod(newMethod);
  };

  const fetchAnalyticData = () => {
    fetch("/api/analytic/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
      }),
    })
      .then((res) => res.json())
      .then((res: HttpResponseModel) => {
        if (res.status) {
          console.log(res);
          setAnalyticData(res.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchForecastData = () => {
    fetch("/api/forecast/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res: HttpResponseModel) => {
        if (res.status) {
          console.log(res);
          setForecastData(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <PageLayout title={"Analytics"}>
      <>
        <ToggleButtonGroup
          color="primary"
          value={method}
          exclusive
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="monthly">Bulanan</ToggleButton>
          <ToggleButton value="yearly">Tahunan</ToggleButton>
        </ToggleButtonGroup>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <DataBox
              title={`RM ${analyticData?.total_distributed_amount}`}
              description={"Pengagihan"}
              icon={<AttachMoneyIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={`${analyticData?.total_transaction}`}
              description={"Jumlah Bilangan Transaksi"}
              icon={<ReceiptIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={`RM ${analyticData?.total_collected_amount}`}
              description={"Jumlah Wang Dikumpulkan"}
              icon={<AccountBalanceIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox
              title={`${analyticData?.total_asnaf}`}
              description={"Jumlah Bilangan Asnaf"}
              icon={<PeopleIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          {analyticData?.location && (
            <Grid item xs={6}>
              <PieChart
                icon={{ color: "info", component: "leaderboard" }}
                title="Demografik Penerima"
                description="Lokasi"
                chart={{
                  labels: analyticData?.location.map((data: any) => data.name),
                  datasets: {
                    label: "Projects",
                    data: analyticData?.location.map((data: any) => data.value),
                  },
                }}
              />
            </Grid>
          )}
          {analyticData?.gender && (
            <Grid item xs={6}>
              <PieChart
                icon={{ color: "info", component: "leaderboard" }}
                title="Demografik Penerima"
                description="Jantina"
                chart={{
                  labels: analyticData?.gender.map((data: any) => data.name),
                  datasets: {
                    label: "Projects",
                    data: analyticData?.gender.map((data: any) => data.value),
                  },
                }}
              />
            </Grid>
          )}
        </Grid>
        <Divider sx={{ my: 3 }}>Ramalan</Divider>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <DataBox
              title={
                forecastData
                  ? forecastData.receiverTotalNumber
                  : "Processing..."
              }
              description={"Jumlah Bilangan Penerima"}
              icon={<PeopleIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid>
          {/* <Grid item xs={6} md={4}>
            <DataBox
              title={"RM 92.6K"}
              description={"Jumlah Zakat Untuk Individu"}
              icon={<AttachMoneyIcon sx={{ mr: 2 }} />}
            ></DataBox>
          </Grid> */}
          <Grid item xs={6} md={4}>
            <DataBox
              title={
                forecastData
                  ? forecastData.notReceivingZakatInFuture
                  : "Processing..."
              }
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
