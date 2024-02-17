module.exports = function (io) {
    const connectedUsers = {};

    io.on("connection", (socket) => {
        console.log("New client connected, id: " + socket.id);

        // Store the socket.id along with the username and chatRoom
        socket.on("setUsername", (username) => {
            connectedUsers[socket.id] = { username };
        });

        socket.on("joinChatRoom", (chatRoom) => {
            connectedUsers[socket.id].chatRoom = chatRoom;
            socket.join(chatRoom);
            console.log(`${connectedUsers[socket.id].username} joined ${chatRoom}`);
        });

        socket.on("sendMessage", (message) => {
            console.log("Received message from client:", message);

            const senderInfo = connectedUsers[socket.id];
            const { username, chatRoom } = senderInfo;

            // Assuming message is an object with 'content' property
            io.to(chatRoom).emit("message", { username, content: message.content });
        });

        socket.on("disconnect", () => {
            const disconnectedInfo = connectedUsers[socket.id];
            if (disconnectedInfo) {
                const { username, chatRoom } = disconnectedInfo;
                console.log(`${username} disconnected from ${chatRoom}`);
            }

            delete connectedUsers[socket.id];
        });
    });
};