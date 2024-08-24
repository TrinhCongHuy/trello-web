import { Box, Container } from "@mui/material"
import SideBar from "./SideBar/SideBar"
import BoardList from "./BoardList/BoardList"
import Grid from '@mui/material/Grid';

const BoardDashboard = () => {
  
  return (
    <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          display: "flex",
          height: (theme) => `${theme.trello.dashBoardHeight}`,
          bgcolor: (theme) =>
            theme.palette.mode == "dark" ? "#34495e" : "#1976d2",
          overflowX: "auto",
          overflowY: "hidden",
          p: "20px 0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <SideBar />
            </Grid>
            <Grid item lg={9} md={9} sm={8} xs={12} >
              <BoardList />
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}

export default BoardDashboard