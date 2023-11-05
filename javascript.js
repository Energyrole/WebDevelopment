const socket = io("http://127.0.0.1:3000");


socket.on("connect", () => {
    console.log(`Connected to server using id: ${socket.id}`);
    document.querySelector('#self').innerHTML = socket.id;
    socket.on("host", (data) => {
        document.querySelector("#host").innerHTML = (data.substring(0, 20))
    })
})