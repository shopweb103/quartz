const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 10000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// লাইভ চ্যাট লজিক
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // ক্লায়েন্ট থেকে মেসেজ আসলে senderId সহ সবার কাছে পাঠানো
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', {
      user: data.user || 'Anonymous',
      text: data.text,
      senderId: data.senderId, // এখানে senderId পাস করা হলো
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
