import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SideBarList from "./SideBarList";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/lzs-logo.png";

const drawerWidth = 240;
interface ClippedDrawerProps {
  children: JSX.Element[];
}
export default function ClippedDrawer({ children }: ClippedDrawerProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <img
          src={logo}
          alt={"lembaga zakat selangor"}
          onClick={() => navigate("/")}
          // height={"50px"}
          width={"90%"}
          style={{ padding: "5%" }}
        />
        <SideBarList />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: "calc(100% - 240px)" }}
      >
        {children}
      </Box>
    </Box>
  );
}
