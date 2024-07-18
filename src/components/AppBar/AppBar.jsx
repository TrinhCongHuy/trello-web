import Box from "@mui/material/Box"
import ModeSelect from "~/components/ModeSelect/ModeSelect"
import AppsIcon from "@mui/icons-material/Apps"
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg"
import SvgIcon from "@mui/material/SvgIcon"
import Typography from "@mui/material/Typography"
import Workspaces from "./Menus/Workspaces"
import Recent from "./Menus/Recent"
import Starred from "./Menus/Starred"
import Templates from "./Menus/Templates"
import TextField from "@mui/material/TextField"
import Badge from "@mui/material/Badge"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Tooltip from "@mui/material/Tooltip"
import Profiles from "./Menus/Profiles"
import Button from "@mui/material/Button"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react"

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <Box
        px={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          overflowX: 'auto',
          height: (theme) => theme.trello.appBarHeight,
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#2c3e50" : "#1565c0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "white" }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloLogo}
              inheritViewBox
              aria-label="Trello Logo"
              fontSize="small"
              sx={{ color: "white" }}
            />
            <Typography
              variant="span"
              sx={{ color: "white", fontWeight: "600", fontSize: "1.2rem" }}
            >
              Trello
            </Typography>
          </Box>

          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{ color: "white", border: "none", '&:hover': { border: 'none'}}}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon 
                    fontSize="small"
                    sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer'}}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }}
            label="Search..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              minWidth: '120px',
              maxWidth: '170px',
              '& label': {
                color: 'white'
              },
              '& input': {
                color: 'white'
              },
              '& label.Mui-focused': {
                color: 'white'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white'},
                '&:hover fieldset': { borderColor: 'white'},
                '&.Mui-focused fieldset': { borderColor: 'white'}
              }
            }}
          />
          <ModeSelect />
          <Badge color="warning" variant="dot">
            <Tooltip title="Notification">
              <NotificationsNoneIcon sx={{ color: "white" }} />
            </Tooltip>
          </Badge>

          <Tooltip title="Information">
            <HelpOutlineIcon sx={{ color: "white" }} />
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
