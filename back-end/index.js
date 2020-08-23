import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/list', (req, res) => {
  res.json([1,2,3,4])
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
