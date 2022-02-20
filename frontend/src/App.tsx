import "./App.css";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

// Pages
import Home from "./pages/Home";
import ViewForm from "./pages/ViewForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/application/:formId", element: <ViewForm /> },
    { path: "/admin/analytics", element: <Analytics /> },
  ]);
  return (
    <>
      <CssBaseline />
      {routes}
    </>
  );
}

export default App;
