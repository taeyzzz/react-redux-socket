import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: "default",
  loadList: "idle",
  list: []
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
  }
})

const { actions, reducer } = applicationSlice
export const { changeMessage, loadListRequest, loadListSuccess, loadListFailure, loadListIdle} = actions
export default reducer

export const fetchAPI = (arg) => async (dispatch, getState) => {
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
