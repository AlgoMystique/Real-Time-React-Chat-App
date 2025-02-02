// src/socket.js
import { io } from "socket.io-client";

// Connect to the deployed backend
const socket = io("https://real-time-react-chat-app-backend.onrender.com");

export default socket;
