import axios from "axios"
import { API_ROOT } from "~/utils/constants"

// Boards
export const fetchBoardDetailApi = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return request.data
}

export const updateBoardDetailApi = async (boardId, boardData) => {
    const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, boardData)
    return request.data
}

export const moveCardToDifferentColumnApi = async (updateData) => {
    const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
    return request.data
}

// Columns
export const createNewColumnApi = async (newColumnData) => {
    const request = await axios.post(`${API_ROOT}/v1/columns/add-column`, newColumnData )
    return request.data
}

export const updateColumnDetailApi = async (columnId, columnData) => {
    const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, columnData)
    return request.data
}

// Card
export const createNewCardApi = async (newCardData) => {
    const request = await axios.post(`${API_ROOT}/v1/cards/add-card`, newCardData)
    return request.data
}