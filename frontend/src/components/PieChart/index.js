import { useMemo } from "react";

// react-chartjs-2 components
import { Pie } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// PieChart configurations
import configs from "./configs";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function PieChart({ icon, title, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderChart = (
    <Box py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <Box display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          <LocationOnIcon sx={{ mr: 2 }} />
          <Box mt={icon.component ? -2 : 0}>
            {title && <Typography variant="h6">{title}</Typography>}
            <Box mb={2}>
              <Typography component="div" variant="button" color="text">
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      {useMemo(
        () => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box width={250}>
              <Pie data={data} options={options} />
            </Box>
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );
  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PieChart
PieChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

export default PieChart;
