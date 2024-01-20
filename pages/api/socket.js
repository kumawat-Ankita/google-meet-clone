import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    console.log("called api")
    if (res.socket.server.io) {
        console.log("Server is already running")
    } else {
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on("connection", (socket) => {
            console.log("Server is connected")

            socket?.on('join-room', (roomId, id) => {
                console.log(`a new user ${userId} joined room ${roomId}`)
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-connected', userId)
            })
        });
    }
    res.end();
}
export default SocketHandler;