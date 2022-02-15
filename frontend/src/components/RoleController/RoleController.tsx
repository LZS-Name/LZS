import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function BasicSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userIsAdmin, setUserIsAdminFn } = useUserContext();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setUserIsAdminFn(true);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "admin") {
      setUserIsAdminFn(true);
      navigate("/admin");
    } else {
      setUserIsAdminFn(false);
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
          value={userIsAdmin ? "admin" : "user"}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
