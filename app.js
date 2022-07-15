const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
var _ = require('lodash')

const authRouter = require('./routes/auth.routes.js')
const conversationRouter = require('./routes/conversation.routes')
const messageRouter = require('./routes/message.routes')
const messageGroupRouter = require('./routes/messagesGroup.routes')
const groupRouter = require('./routes/group.routes')

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

const app = express() 



app.use(cors({ credentials: true }))

//pour coonvertir les données en json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());




app.use('/images/', express.static(path.join(__dirname,'images')))
app.use('/api/v1', authRouter)
app.use('/api/v1/conversation', conversationRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/groupe', groupRouter)
app.use('/api/v1/group/messages', messageGroupRouter) 






  

module.exports= app;