import "./App.css";
import { Route, Routes, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";

function App()  {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    // ...
  ]);
  return (
    <>
      <CssBaseline />
      {routes}
      {/* <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes> */}
    </>
  );
}

export default App;
