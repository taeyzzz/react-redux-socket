import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import applicationReducer from '../slice/aplication'

import socketMiddleware from './middlewares/socket'

const rootReducer = {
  application: applicationReducer
}

const createStore = () => {
  const middleware = [...getDefaultMiddleware(), socketMiddleware]
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}

export default createStore
