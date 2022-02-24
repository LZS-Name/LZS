import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

function DataBox({ title, description, icon }) {
  return (
    <Card py={2} pr={2} pl={icon ? 1 : 2} sx={{ height: "100%" }}>
      <Box display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
        {icon}
        <Box mt={icon.component ? -2 : 0}>
          {title && <Typography variant="h6">{title}</Typography>}
          <Box mb={2}>
            <Typography component="div" variant="button" color="text">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default DataBox;
