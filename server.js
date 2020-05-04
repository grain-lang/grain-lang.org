const express = require('express')
const app = express()
const port = 3000

app.use(express.static('.', { extensions: ['html'] }));
const server = app.listen(port, () => console.log(`Grain website running at http://localhost:${port}`))

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nHappy writing! 🌾')
  })
})