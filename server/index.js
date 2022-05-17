const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const port = 3000;

io.on('connection', socket => {
  //connection
  console.log('user connected !!!');

  // join planet room
  socket.on('joinPlanetRoom', ({user, room}) => {
    socket.join(room);
    socket.nsp.to(room).emit('welcome', {
      title: 'Welcome',
      description: `${user.name} just entered the room`,
    });
  });

  // leave planet room
  socket.on('leavePlanetRoom', ({user, room}) => {
    socket.leave(room);
    socket.nsp.to(room).emit('goodbye', {
      title: 'Goodbye',
      description: `See you again, ${user.name}`,
    });
  });

  // receive & emit msg
  socket.on('sendMessage', ({msg, room}) => {
    console.log('msg here', msg);
    socket.nsp.in(room).emit('getMessage', msg);
  });

  //disconnection
  socket.on('has been disconnected', () => {
    console.log('user disconnected!');
  });
});
server.listen(port, () => console.log('server running on port:' + port));
