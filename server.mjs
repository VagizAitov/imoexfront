import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const PORT = process.env.PORT || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

cd 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, (req, res) => {
    console.log(__dirname)
})