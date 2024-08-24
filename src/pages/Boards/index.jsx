import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardDashboard from "~/pages/Boards/BoardDashboard/BoardDashboard";

const Boards = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardDashboard />
    </Container>
  );
};

export default Boards;
