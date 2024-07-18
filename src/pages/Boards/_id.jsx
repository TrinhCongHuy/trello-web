import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailApi } from '~/apis'
import { mockData } from '~/apis/mock-data'

const Board = () => {
  const [board, setBoard] = useState(null)
  const boardId = '6698ce32bf8a4000ac665189'

  useEffect(() => {
    fetchBoardDetailApi(boardId).then(board => 
      setBoard(board)
    )
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData.board}/>
      <BoardContent board={mockData.board}/>
    </Container>
  )
}

export default Board