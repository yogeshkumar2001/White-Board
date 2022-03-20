const express = require("express");

// application // backend // server
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", function (socket) {
  console.log(socket.id + " connected !! ");

  socket.on("md", function (pointObject) {
    //    console.log("md" , pointObject);
    socket.broadcast.emit("mousedown", pointObject);
  });

  socket.on("mm", function (pointObject) {
    //    console.log("mm" , pointObject);
    socket.broadcast.emit("mousemove", pointObject);
  });

  socket.on("mu", function () {
    socket.broadcast.emit("mouseup");
  });

  socket.on("disconnect", function () {
    console.log("socket disconnected !!");
  });
});

// http method , app route , route handler
// app.get("/" , function(request , response){
//     let path = __dirname+"/public/main.html";
//     console.log(path);
//     response.sendFile(__dirname+"/public/main.html");
// })

http.listen(`https://yogeshkumar2001.github.io/White-Board/`, function () {
  console.log("app started at port 3000 !!!");
});
