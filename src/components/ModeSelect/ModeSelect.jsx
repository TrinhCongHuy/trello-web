import { useColorScheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="select-dark-light-mode"
        sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' },
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="select-dark-light-mode"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiBox-root': { color: 'white' },
          '& .MuiSvgIcon-root': { color: 'white' }
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: (theme) => theme.palette.mode == 'dark' ? '#ffffff' : '#000' }}>
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: (theme) => theme.palette.mode == 'dark' ? '#ffffff' : '#000' }}>
            <DarkModeOutlinedIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: (theme) => theme.palette.mode == 'dark' ? '#ffffff' : '#000' }}>
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModeSelect;
