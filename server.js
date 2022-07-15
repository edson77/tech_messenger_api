const config = require("./config/config");
const http = require('http');
const app = require("./app")

const mongoose = require('mongoose')


// connexion de mongodb

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



app.set('port', config.port)

const server = http.createServer(app);

// ajout de socket.io
const io = require('socket.io')(server)

let users = []
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) =>{
  users =users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) =>{
  return users.find(user => user.userId === userId)
}
// établissement de la connexion
io.on('connection', (socket) =>{
  //prendre le userId et le socketId du user
  io.on('addUser', (userId) =>{
    addUser(userId, socket.id); 
    console.log(users)
    io.emit('getUsers', users)
  })


  //envoyer et recevoir des messages
  socket.on("privateMessage",(msg) =>{
    //const user = getUser(userId);
    console.log(msg)
    io.to(socket.id).emit("privateMessage",{
      userId,
      authId,
      msg,
      media_path
    })
  })

  //deconnectin
  socket.on('disconnect', ()=>{
    console.log("je me deconnecte")
    removeUser(socket.id)
  })
})


server.listen(config.port, () =>
    console.log('le serveur a démarer sur le port '+ config.port)
);