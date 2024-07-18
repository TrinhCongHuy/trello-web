import axios from "axios"
import { API_ROOT } from "~/utils/constants"


export const fetchBoardDetailApi = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/boards/${boardId}`)
    return request.data
}
