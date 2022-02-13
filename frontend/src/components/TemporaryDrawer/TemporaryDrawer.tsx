import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import SideBarList from "../SideNav/SideBarList";

const TemporaryDrawer = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event instanceof KeyboardEvent &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return (
    <div>
      <React.Fragment>
        <IconButton
          size="large"
          aria-label="show more"
          onClick={toggleDrawer(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>
          <SideBarList toggleDrawer={toggleDrawer} />
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
