import "./App.css";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

// Pages
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import ViewForm from "./pages/ViewForm";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/admin", element: <HomeAdmin /> },
    { path: "/admin/application/:formId", element: <ViewForm /> },
  ]);
  return (
    <>
      <CssBaseline />
      {routes}
    </>
  );
}

export default App;
