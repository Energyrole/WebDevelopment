const { createServer } = require("http");
const { Server } = require("socket.io");

const hostname = "127.0.0.1";
const port = 3000;

let clients = new Array();

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
});

// function searchForElement(item) {
//     let found = false
//     for (let i = 0; i != clients.length; i++) {
//         if (clients[i] == item) {
//             found = true
//         }
//     }
//     return found
// }

io.on("connection", (socket) => {
    console.log("A client has connected!");
    if (clients.length == 0) { //Clients list is empty meaning this is the host
        clients[0] = socket.id;
        io.to(socket.id).emit("host", "You")
    } else if (!clients.includes(socket.id)) { //Clients list is not empty, therefore if he doesn't exist already, add him
        clients[clients.length] = socket.id;
        io.except(clients[0]).emit("host", clients[0]);
        io.except(clients[0]).emit("message", clients[0]);
    } else { //Client already exists in list
        console.log("Client already exists");
    }
    console.log(clients)
    socket.on("disconnect", () => {
        if (clients[0] === socket.id) {
            clients.shift();
            socket.to(clients[0]).emit("host", "You");
            socket.except(clients[0]).emit("host", socket[0])
        } else {
            clients.pop();
        }
        console.log("A client has disconnected!");
    });
});

httpServer.listen(port, hostname, () => {
    console.log(`Server Up and running at http://${hostname}:${port}`);
})