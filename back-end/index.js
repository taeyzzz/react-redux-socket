import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import socketIO from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const PORT = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/list', (req, res) => {
  res.json([1,2,3,4])
})

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
