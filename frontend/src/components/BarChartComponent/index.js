import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChatComponent({
  title,
  description,
  icon,
  labels,
  dataset,
  increasingPercent,
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Bilangan",
        data: dataset,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: title ? true : false,
      //   text: title,
      // },
    },
  };
  const color = increasingPercent > 0 ? "success" : "error";
  return (
    <Card pr={2} pl={icon ? 1 : 2} sx={{ height: "100%" }}>
      <Grid
        display="flex"
        container
        direction="column"
        justifyContent={"space-between"}
        px={description ? 1 : 0}
        pt={description ? 1 : 0}
        sx={{ height: "100%" }}
      >
        <Box display="flex" mt={icon.component ? -2 : 0}>
          {icon}
          {title && <Typography variant="body1">{title}</Typography>}
          {increasingPercent > 0 ? (
            <ArrowUpwardIcon color={color} />
          ) : (
            <ArrowDownwardIcon color={color} />
          )}
          <Typography
            component="span"
            sx={{ color: increasingPercent > 0 ? "#4caf50" : "#f44336" }}
          >
            {increasingPercent.toFixed(2)}%
          </Typography>
        </Box>
        <Bar options={options} data={data} />
      </Grid>
    </Card>
  );
}
