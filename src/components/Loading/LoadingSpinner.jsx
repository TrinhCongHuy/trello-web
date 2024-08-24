import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        bgcolor: "#f5f5f5",
        borderRadius: 2
      }}
    >
      <CircularProgress sx={{ color: "#576777", mb: 2 }} />
      <Typography variant="body1" sx={{ color: "#576777" }}>
        Loading your data...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
