import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBoardsOfUserApi } from "~/apis";
import LoadingSpinner from "~/components/Loading/LoadingSpinner";

const BoardList = () => {
  const [boards, setBoards] = useState(null);
  const navigate = useNavigate();
  
  const userInfo = localStorage.getItem('userInfo');
  const user = JSON.parse(userInfo);
  const { id } = user;
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBoardsOfUserApi(id);
      setBoards(res);
    };
    fetchData();
  }, [id]);

  const handleClickBoard = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  if (!boards) {
    return <LoadingSpinner />;
  }

  const gradients = [
    'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
    'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    'linear-gradient(135deg, #141e30, #243b55)',
    'linear-gradient(135deg, #373b44, #4286f4)',
    'linear-gradient(135deg, #6a11cb, #2575fc)',
    'linear-gradient(135deg, #232526, #414345)',
    'linear-gradient(135deg, #3a7bd5, #3a6073)',
    'linear-gradient(135deg, #56ccf2, #2f80ed)',
  ];

  return (
    <Box sx={{ bgcolor: '#ffffff', color: '#000', height: '85vh', borderRadius: 2, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#576777', fontWeight: 'bold', fontSize: '1.2rem' }}>Your Boards</Typography>
      <Grid container spacing={2}>
        {boards.map((board) => {
          const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={board._id}>
              <Card 
                onClick={() => handleClickBoard(board._id)} 
                sx={{ 
                  background: randomGradient, 
                  borderRadius: 2, 
                  cursor: 'pointer' 
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#ffffff'}}>{board.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#ffffffb3' }}>
                    {board.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem', color: '#ffffff99' }}>
                    Type: {board.type}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BoardList;
