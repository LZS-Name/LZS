import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface OptionObj {
  title: string;
  value: string;
}
interface BasicSelectProps {
  options: OptionObj[];
  label: string;
  value: string;
  name: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  handleChange: (event: SelectChangeEvent) => void;
  handleBlur: (event: React.FocusEvent<any, Element>) => void;
  disabled?: boolean;
}
export default function BasicSelect({
  label,
  options,
  value,
  name,
  error,
  touched,
  handleChange,
  handleBlur,
  disabled,
}: BasicSelectProps) {
  // const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   setValue(event.target.value);
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error && touched ? true : false}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="simple-select"
          value={value}
          label={label}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        >
          {options.map((option: OptionObj, idx: number) => (
            <MenuItem value={option.value} key={idx}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
        {error && touched && (
          <FormHelperText id="" error={true}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
