import { createSlice, createAction } from '@reduxjs/toolkit'

export const sendMessageSocket = createAction("sendMessageSocket", (message) => {
  return {
    payload: {
      message,
    }
  }
})

const initialState = {
  message: "default",
  loadList: "idle",
  list: [],
  socketConnected: false,
  listUser: [],
  listChat: [],
  currentUser: undefined
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    changeMessage: {
      reducer: (state, action) => {
        state.message = action.payload.message
      },
      prepare: (message) => ({ payload: { message } })
    },
    loadListRequest: (state, action) => {
      state.loadList = "request"
    },
    loadListSuccess: {
      reducer: (state, action) => {
        state.loadList = "success"
        state.list = action.payload.list
      },
      prepare: (list) => ({ payload: { list } })
    },
    loadListFailure: {
      reducer: (state, action) => {
        state.loadList = "failure"
      },
      prepare: (error) => ({ payload: { error } })
    },
    loadListIdle: (state, action) => {
      state.loadList = "idle"
    },
    socketConnected: (state, action) => {
      state.socketConnected = true
    },
    updateNewLoginUser: {
      reducer: (state, action) => {
        state.listUser = action.payload.listUser
      },
      prepare: (listUser) => ({ payload: { listUser } })
    },
    updateListChat: {
      reducer: (state, action) => {
        state.listChat = [...state.listChat, { message: action.payload.message, author: action.payload.author }]
      },
      // prepare: (listUser) => ({ payload: { listUser } })
    },
    loginSocket: {
      reducer: (state, action) => {
        state.currentUser = action.payload.userName
      },
      prepare: (userName) => ({ payload: { userName } })
    }
  }
})

const { actions, reducer } = applicationSlice
export const { changeMessage, loadListRequest, loadListSuccess, loadListFailure, loadListIdle, socketConnected, updateNewLoginUser, updateListChat, loginSocket } = actions
export default reducer

export const fetchAPI = () => async (dispatch, getState) => {
  try {
    dispatch(loadListRequest())
    const res = await fetch('http://localhost:4000/list')
    const data = await res.json()
    dispatch(loadListSuccess(data))
  }
  catch (e) {
    dispatch(loadListFailure(e))
  }
  finally{
    dispatch(loadListIdle())
  }
}

export const connectSocket = createAction('application/connectSocket')
