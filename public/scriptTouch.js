const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let { top: canvasTop } = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight - canvasTop;
  canvas.width = window.innerWidth;
  redrawLines();
});
ctx.lineCap = "round";
ctx.joinCap = "round";

let db = [];
let isMouseDown = false;
let line = [];
let redoDb = [];
canvas.addEventListener("touchstart", function (e) {
  isMouseDown = true;
  let x = e.clientX;
  let y = e.clientY - canvasTop;

  ctx.beginPath();
  ctx.moveTo(x, y);
  let pointObject = {
    id: "md",
    x,
    y,
    lineWidth: ctx.lineWidth,
    strokeStyle: ctx.strokeStyle,
  };
  line.push(pointObject);
  socket.emit("md", pointObject);
  console.log("touchstart")
});
canvas.addEventListener("touchmove", function (e) {
  if (redoDb.length) {
    redoDb = [];
  }
  if (isMouseDown) {
    let x = e.clientX;
    let y = e.clientY - canvasTop;
    ctx.lineTo(x, y);
    ctx.stroke();
    let pointObject = {
      id: "mm",
      x,
      y,
    };
    line.push(pointObject);
    socket.emit("mm", pointObject);
    console.log("touchmove")
  }
});
canvas.addEventListener("touchend", function (e) {
  isMouseDown = false;
  db.push(line);
  line = [];
  socket.emit("mu");
  // console.log(db);
});
/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression 
     containing some mobile devices keywords 
     to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
     it returns boolean value*/
let isMobileDevice = regexp.test(details);

if (isMobileDevice) {
  document.write("You are using a Mobile Device");
  console.log("mobile");
  let tools = document.getElementById("yuvi");
  tools.style.backgroundColor = "red";
} else {
  document.write("You are using Desktop");
  console.log("desktop");
  let tools = document.getElementById("yuvi");
  tools.style.backgroundColor = "green";
}
