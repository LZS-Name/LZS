import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router";

import RoleController from "../RoleController";
import { useUserContext } from "../../contexts/UserContext";
import { Grid } from "@mui/material";

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
    label: "Home",
    icon: <HomeIcon />,
  },
];
const adminList = [
  {
    link: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    link: "/",
    label: "Payment",
    icon: <PaidIcon />,
  },
  {
    link: null,
    label: "Analytics",
    icon: <EqualizerIcon />,
  },
];
const SideBarList = ({ toggleDrawer = () => () => {} }: SideBarListProps) => {
  const navigate = useNavigate();
  const { userIsAdmin } = useUserContext();
  const navigations = !userIsAdmin ? userList : adminList;

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
