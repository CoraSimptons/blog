const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

// Lắng nghe request đã được gửi chưa và xuất ra
app.use(morgan('combined'))

// Route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})