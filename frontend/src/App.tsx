import "./App.css";
import { Route, Routes, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    // ...
  ]);
  return (
    <>
      <CssBaseline />
      {routes}
    </>
  );
}

export default App;
