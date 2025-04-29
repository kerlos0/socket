const io = require('socket.io')(4500, {
  cors: {
      origin: ['http://localhost:5173']
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', ( message ) => {
      console.log(`Message in ${message}`);
      io.emit('message', message); 
  });

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});
