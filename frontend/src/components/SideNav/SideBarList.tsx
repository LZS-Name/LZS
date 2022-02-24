import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router";

import RoleController from "../RoleController";
import { useUserContext } from "../../contexts/UserContext";
import { Grid } from "@mui/material";
import routes from "../../pages/routes";

interface SideBarListProps {
  toggleDrawer?: (
    arg0: boolean
  ) => (
    arg0: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
}
const userList = [
  {
    link: "/",
    label: "Aplikasi",
    icon: <HomeIcon />,
  },
];
const adminList = [
  {
    link: routes.dashboard.replace(":formType", "registration"),
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    link: routes.analytics,
    label: "Analisis",
    icon: <EqualizerIcon />,
  },
];
const SideBarList = ({ toggleDrawer = () => () => {} }: SideBarListProps) => {
  const navigate = useNavigate();
  const { userRole } = useUserContext();
  const navigations = userRole === "user" ? userList : adminList;

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, pt: { xs: 2, sm: 1 } }}>
        <Grid item xs={12}>
          <RoleController />
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{ width: { xs: 250, sm: "auto" } }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {navigations.map((navItem, index) => (
            <ListItem
              button
              key={navItem.label}
              onClick={() => {
                if (!navItem.link) return;
                navigate(navItem.link);
              }}
            >
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              <ListItemText primary={navItem.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SideBarList;
