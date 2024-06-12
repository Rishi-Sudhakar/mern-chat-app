const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in .env file");
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error(err);
  });

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Chat message schema and model
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  room: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username, password });
  if (!user) {
    user = new User({ username, password });
    await user.save();
  }
  res.send(user);
});

app.get('/messages/:room', async (req, res) => {
  const { room } = req.params;
  const messages = await Message.find({ room });
  res.send(messages);
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', async (data) => {
    const { username, message, room } = data;
    const newMessage = new Message({ username, message, room });
    await newMessage.save();
    io.to(room).emit('receive_message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
