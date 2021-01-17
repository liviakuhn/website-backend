import app from './app.js'

const hostName = '127.0.0.1'
const port = '8080'

app.listen(port, hostName, () => {
  console.log('Listening on %s port %s.', hostName, port)
})
