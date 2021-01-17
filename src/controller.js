import { sendEmail } from './emailer.js'

export const rootHandler = (req, res) => {
  res.statusCode = 200
  res.end('The Node.js backend server is running.\n')
}

export const contactHandler = (req, res) => {
  sendEmail(req.body.subject,
    req.body.checkbox,
    req.body.email,
    req.body.name,
    req.body.message)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Thank you for your message. I will get back to you as soon as possible.')
}
