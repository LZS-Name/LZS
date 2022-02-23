import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import routes from "../../pages/routes";
import { useEffect } from "react";

export default function BasicSelect() {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useUserContext();

  useEffect(() => {
    const userRoleFromStorage = window.sessionStorage.getItem("userRole");
    if (userRoleFromStorage) setUserRole(userRoleFromStorage);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value);
    window.sessionStorage.setItem("userRole", event.target.value);
    if (
      event.target.value === "admin" ||
      event.target.value === "super_admin"
    ) {
      navigate(routes.dashboard.replace(":formType", "registration"));
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userRole}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"super_admin"}>Super Admin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
