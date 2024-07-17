/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  }
}

const BoardBar = (props) => {
  const { board }= props
  return (
    <>
      <Box
        px={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          overflowX: 'auto',
          height: (theme) => theme.trello.boardBarHeight,
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#34495e" : "#1976d2",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<PublicIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add To Google Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white'} }} startIcon={ <PersonAddIcon />}>Invite</Button>

          <AvatarGroup
            max={4}
            sx={{ "& .MuiAvatar-root": { width: 32, height: 32, borderColor: 'transparent' } }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
      </Box>
    </>
  );
};

export default BoardBar;
