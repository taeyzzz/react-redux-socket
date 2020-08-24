import io from 'socket.io-client'
import { connectSocket, socketConnected, updateNewLoginUser, loginSocket, updateListChat, sendMessageSocket } from '../../slice/aplication'

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
      socket.on('new-login', (data) => {
        dispatch(updateNewLoginUser(data.listUser))
      })
      socket.on('receive-chat', (data) => {
        const { message, author } = data
        console.log(message, author);
        dispatch(updateListChat({ message, author }))
      })
      return next(action)
    }
    case loginSocket.toString(): {
      socket.emit("login", { user: action.payload.userName })
      return next(action)
    }
    case sendMessageSocket.toString(): {
      console.log(getState().application.currentUser);
      socket.emit("send-message", { message: action.payload.message, author: getState().application.currentUser })
      return next(action)
    }
    default: {
      return next(action)
    }
  }
}

export default socketMiddleware
