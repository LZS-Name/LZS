import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";

interface Forms {
  registration: string;
  conflict: string;
}

interface ApplicationSelectorProps {
  formKey: Forms;
  formMap: Forms;
}

export default function ApplicationSelector({
  formKey,
  formMap,
}: ApplicationSelectorProps) {
  const [formType, setFormType] = useState(formKey.registration);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith(formMap.registration)) {
      setFormType(formKey.registration);
    } else if (location.pathname.startsWith(formMap.conflict)) {
      setFormType(formKey.conflict);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormType(value);
    if (value === formKey.registration) {
      navigate(formMap.registration);
    } else if (value === formKey.conflict) {
      navigate(formMap.conflict);
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Jenis Aplikasi</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formType}
          label="Application Type"
          onChange={handleChange}
        >
          <MenuItem value={formKey.registration}>Pendaftaran</MenuItem>
          <MenuItem value={formKey.conflict}>Konflik</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
