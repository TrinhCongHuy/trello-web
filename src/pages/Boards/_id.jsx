import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
import { useEffect, useState } from "react"
import {
  createNewCardApi,
  createNewColumnApi,
  deleteColumnInBoardApi,
  fetchBoardDetailApi,
  moveCardToDifferentColumnApi,
  updateBoardDetailApi,
  updateColumnDetailApi
} from "~/apis"
import { isEmpty } from "lodash"
import { generatePlaceholderCard } from "~/utils/formatters"
import { mapOrder } from "~/utils/sorts"
import { Box, CircularProgress } from "@mui/material"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"


const Board = () => {
  const [board, setBoard] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetchBoardDetailApi(id).then((board) => {

      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id") 

      board.columns.forEach((column) => {
        // Kiểm tra column.cards có rống hay ko, nếu rỗng thì thêm cardPlaceholder vào
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id")
        }
      }),
        setBoard(board)
    })
  }, [id])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id,
    })

    // Mặc định khi tạo mới column mà chưa có cards thì sẽ có cardPlaceholder
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id,
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )

    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // Gọi api update position column khi thực hiện hoán đổi vị trí
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardDetailApi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    })
  }

  // Gọi api update position card trong cùng 1 column
  const moveCardInColumnSame = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    
    await updateColumnDetailApi(columnId, {
      cardOrderIds: dndOrderedCardIds,
    })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update board

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    let nextCardOrderIds = dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    if (nextCardOrderIds[0].includes('placeholder-card')) nextCardOrderIds = []

    moveCardToDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,

      nextColumnId,
      nextCardOrderIds
    })
  }

  const deleteColumnInBoard = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== columnId)
    setBoard(newBoard)

    deleteColumnInBoardApi(columnId).then(res => {
      toast.success(res?.deleteResult, { position: "top-right", theme: "colored" })
    })

  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInColumnSame={moveCardInColumnSame}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnInBoard={deleteColumnInBoard}
        board={board}
      />
    </Container>
  )
}

export default Board
