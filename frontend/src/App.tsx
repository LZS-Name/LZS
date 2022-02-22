import "./App.css";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import routes from "./pages/routes";

// Pages
import Home from "./pages/Home";
import ViewForm from "./pages/ViewForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  let pages = useRoutes([
    { path: routes.home, element: <Home /> },
    { path: routes.dashboard, element: <Dashboard /> },
    { path: routes.viewForm, element: <ViewForm /> },
    { path: routes.viewForm, element: <Analytics /> },
  ]);
  return (
    <>
      <CssBaseline />
      {pages}
    </>
  );
}

export default App;
