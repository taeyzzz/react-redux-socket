import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import applicationReducer from '../slice/aplication'

const rootReducer = {
  application: applicationReducer
}

const createStore = () => {
  const middleware = [...getDefaultMiddleware()]
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}

export default createStore
