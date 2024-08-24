import { Box, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg";
import TimelineIcon from '@mui/icons-material/Timeline';
import AddIcon from '@mui/icons-material/Add';


const SideBar = () => {
  return (
    <Box
      sx={{
        py: 1,
        bgcolor: "#ffffff",
        height: "85vh",
        color: "#000",
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
          "&:hover": { bgcolor: "rgba(218, 216, 216, 0.5)", borderRadius: '10px' },
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            aria-label="Trello Logo"
            fontSize="small"
            sx={{ color: "#425168", mr: 1, fontSize: "15px" }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#727b8a' }}>Bảng</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
          "&:hover": { bgcolor: "rgba(218, 216, 216, 0.5)", borderRadius: '10px' },
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            aria-label="Trello Logo"
            fontSize="small"
            sx={{ color: "#425168", mr: 1, fontSize: "15px" }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#727b8a' }}>Mẫu</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
          "&:hover": { bgcolor: "rgba(218, 216, 216, 0.5)", borderRadius: '10px' },
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <TimelineIcon sx={{ fontSize: "15px", color: "#425168", mr: 1 }}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#727b8a' }}>Trang chủ</Typography>
        </Box>
      </Box>

      <hr style={{ color: '#e3e3e3', margin: '5px 5px', height: '0.5px' }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, color: '#727b8a' }}>Các không gian làm việc</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
          "&:hover": { bgcolor: "rgba(218, 216, 216, 0.5)", borderRadius: '10px' },
          cursor: "pointer",
        }}
      >
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <AddIcon sx={{ color: "#425168", mr: 1, fontSize: "15px" }}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#727b8a' }}>Tạo không gian làm việc</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
