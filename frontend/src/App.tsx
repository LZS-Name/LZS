import "./App.css";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/admin", element: <HomeAdmin /> },
  ]);
  return (
    <>
      <CssBaseline />
      {routes}
    </>
  );
}

export default App;
