import express from 'express'
import bodyParser from 'body-parser'
import router from './router.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

export default app
