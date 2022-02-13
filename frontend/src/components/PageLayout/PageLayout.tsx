import React from "react";
import Header from "../Header";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ClippedDrawer from "../SideNav/ClippedDrawer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
type PageTitleProps = {
  title: string;
};
const PageTitle = ({ title }: PageTitleProps) => {
  if (!title) return <></>;
  return (
    <>
      <Box sx={{ mb: 1, ml: { xs: 0 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="capitalize"
          sx={{ pt: 1 }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
};
interface PageLayoutProps {
  children: JSX.Element;
  title: string;
}
const PageLayout = ({ children, title }: PageLayoutProps) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
  if (isMdUp) {
    return (
      <ClippedDrawer>
        <PageTitle title={title} />
        {children}
      </ClippedDrawer>
    );
  }
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: { xs: "10px", md: "20px" },
          paddingBottom: "67px",
          // margin: "10px",
          // marginBottom: "67px",
          height: "calc(100% - 56px)",
        }}
      >
        <PageTitle title={title} />
        {children}
      </Box>
    </>
  );
};

export default PageLayout;
