// import authorizedAxiosInstance from "~/utils/authorizedAxios"
import authorizedAxiosInstance from "~/utils/authorizedAxios"
import { API_ROOT } from "~/utils/constants"

// Users
export const fetchUsersApi = async () => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/`)
    return request.data
}

export const fetchUserDetailApi = async (id) => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/${id}`)
    return request.data
}

export const fetchSignUpApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign-up`, data)
    return request.data
}

export const fetchSignInApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign-in`, data)
    return request.data
}

export const fetchNewOtpApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password/email`, data)
    return request.data
}

export const fetchOtpApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password/verify-otp`, data)
    return request.data
}

export const fetchResetPasswordApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password/reset-password`, data)
    return request.data
}

export const refreshTokenApi = async () => {
    return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh-token`)
}

export const handleLogoutApi = async () => {
    localStorage.removeItem('userInfo')
    return await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/logout`)
}

// Boards
export const fetchCreateBoardApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards/add-board`, data)
    return request.data
}

export const fetchBoardDetailApi = async (boardId) => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/detail/${boardId}`)
    return request.data
}

export const fetchBoardsOfUserApi = async (userId) => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${userId}`)
    return request.data
}

export const updateBoardDetailApi = async (boardId, boardData) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/update-board/${boardId}`, boardData)
    return request.data
}

export const addMemberToBoardApi = async (boardId, userId) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/update-board/${boardId}`, userId)
    return request.data
}

export const moveCardToDifferentColumnApi = async (updateData) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
    return request.data
}

// Columns
export const createNewColumnApi = async (newColumnData) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns/add-column`, newColumnData )
    return request.data
}

export const updateColumnDetailApi = async (columnId, columnData) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, columnData)
    return request.data
}

export const deleteColumnInBoardApi = async (columnId) => {
    const request = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return request.data
}

// Card
export const createNewCardApi = async (newCardData) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/add-card`, newCardData)
    return request.data
}

// Invite
export const fetchCreateInviteApi = async (data) => {
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/invites/add-invite`, data)
    return request.data
}

export const fetchInviteDetailApi = async (inviteId) => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invites/detail/${inviteId}`)
    return request.data
}

export const fetchInviteByUserApi = async (isReading) => {
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invites?isReading=${isReading}`)
    return request.data
}

export const fetchInviteUpdateApi = async (inviteId, updateData) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invites/update-invite/${inviteId}`, updateData)
    return request.data
}