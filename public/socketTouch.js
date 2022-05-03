let myPenSize;
let myPenColor;
socket.on("touchstart" , function(pointObject){
    myPenSize = ctx.lineWidth;
    myPenColor = ctx.strokeStyle;
    ctx.lineWidth = pointObject.lineWidth;
    ctx.strokeStyle = pointObject.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(pointObject.x , pointObject.y);
})

socket.on("touchmove" , function(pointObject){
    ctx.lineTo(pointObject.x , pointObject.y);
    ctx.stroke();
})

socket.on("touchend" , function(){
    ctx.lineWidth = myPenSize;
    ctx.strokeStyle = myPenColor;
})