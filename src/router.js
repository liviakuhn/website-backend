import express from 'express'
import { rootHandler, contactHandler } from './controller.js'

const router = express.Router()

router.get('/', rootHandler)
router.post('/contact', contactHandler)

export default router
