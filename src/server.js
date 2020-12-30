const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

const hostName = '127.0.0.1' 
const port = '8080'
const email = process.env.EMAIL
const pass = process.env.PASS
const text = 'Dear Name,<br><br>Thank you for your message. I will get back to you as soon as possible.<br><br>Here is a copy of your message:<br><br>'

app.listen(port, hostName, () => {
    console.log('Listening on %s port %s.', hostName, port)
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.statusCode = 200
    res.end('The Node.js backend server is running.')
})

let transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
               user: email,
               pass: pass
            }
})

function getSubject(reqSubject, subject) {
    if (!reqSubject || reqSubject.length === 0) {
            var subject = 'Thank you for your message'
         } else {
                   var subject = reqSubject
                }
    return subject
}

function getEmailTo(reqCheckbox, reqEmail, emailTo) {
    if (reqCheckbox == 'on') {
            var emailTo = [email, reqEmail]
         } else {
                   var emailTo = email
                }
    return emailTo 
}

function getMessage(email, message, emailTo, subject) {
    message = {
    from: email,
    to: emailTo,
    subject: subject,
    html: messageText + '<blockquote>' + message.replaceAll('\n', '<br>') + '</blockquote>'
		}
		return message
}

app.post('/contact', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')  
    subject = getSubject(req.body.subject)
    emailTo = getEmailTo(req.body.checkbox, req.body.email)
    messageText = text.replace('Name', req.body.name)
		message = getMessage(req.body.email, req.body.message, emailTo, subject)
    transport.sendMail(message, function(err, info) {
          if (err) {
                      console.log(err)
                   } else {
                             console.log(info)
                          }
    })
    res.end('Thank you for your message. I will get back to you as soon as possible.')
})
