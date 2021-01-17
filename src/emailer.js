import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const email = process.env.EMAIL
const pass = process.env.PASS
const text = 'Dear Name,<br><br>Thank you for your message. I will get back to you as soon as possible.<br><br>Here is a copy of your message:<br><br>'

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: email,
    pass: pass
  }
})

const getSubject = reqSubject => reqSubject || 'Thank you for your message'

const getEmailTo = (emailToUser, appEmail, userEmail) => {
  let emailTo = [appEmail]
  if (emailToUser === 'on') {
    emailTo = [appEmail, userEmail]
  }
  return emailTo
}

const getMessage = (email, preamble, userMessage, emailTo, subject) => {
  const message = {
    from: email,
    to: emailTo,
    subject: subject,
    html: preamble + '<blockquote>' + userMessage.replaceAll('\n', '<br>') + '</blockquote>'
  }
  return message
}

export const sendEmail = (subject, emailToUser, userEmail, name, userMessage) => {
  subject = getSubject(subject)
  const emailTo = getEmailTo(emailToUser, email, userEmail)
  const preamble = text.replace('Name', name)
  const message = getMessage(email, preamble, userMessage, emailTo, subject)
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
      return
    }
    console.log(info)
  })
}
