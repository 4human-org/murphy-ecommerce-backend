import express from 'express'
const app = express()
import url from 'url'
import path from 'path'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
   
// TODO add middleware and route handlers here
app.use(express.static('public'))
app.use(express.json());


app.listen(3000)