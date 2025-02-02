const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// CORS Configuration to allow requests from your frontend
app.use(cors({
    origin: "https://real-time-react-chat-app-1.onrender.com",
    methods: ["GET", "POST"]
}));

// Serve static files (if needed)
app.use(express.static("client_build"));

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup with correct CORS
const io = new Server(server, {
    cors: {
        origin: "https://real-time-react-chat-app-1.onrender.com",
        methods: ["GET", "POST"]
    }
});

// Socket.io events
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// Server listening
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`SERVER RUNNING on port ${PORT}`);
});
