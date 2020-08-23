import io from 'socket.io-client'
import { connectSocket, socketConnected } from '../../slice/aplication'

let socket
const socketMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case connectSocket.toString(): {
      if (socket) {
        socket.disconnect()
      }
      socket = io("http://localhost:4000", {
        transports: ['websocket'],
      })
      socket.on('connect', () => {
        dispatch(socketConnected())
      })
      // socket.on('disconnect', () => {
      //   dispatch(socketDisconnected())
      // })
      return next(action)
    }
    default: {
      return next(action)
    }
  }
}

export default socketMiddleware
