var width = window.innerWidth;
var height = window.innerHeight - 25;
var first = true;
var tempPos = [];
var savePos = [];
var lastPos;
// first we need Konva core things: stage and layer
var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height
});
var layer = new Konva.Layer();
stage.add(layer);
// then we are going to draw into special canvas element
var canvas = document.createElement("canvas");
canvas.width = stage.width() / 2;
canvas.height = stage.height() / 2;
// creted canvas we can add to layer as "Konva.Image" element
var image = new Konva.Image({
  image: canvas,
  x: stage.width() / 4,
  y: stage.height() / 4,
  stroke: "green",
  shadowBlur: 5
});
layer.add(image);
stage.draw();
// Good. Now we need to get access to context element
var context = canvas.getContext("2d");
context.strokeStyle = "#df4b26";
context.lineJoin = "round";
context.lineWidth = 5;
var isPaint = false;
var lastPointerPosition;
var mode = "brush";
// now we need to bind some events
// we need to start drawing on mousedown
// and stop drawing on mouseup
stage.on("contentMousedown.proto", function() {
  isPaint = true;
  lastPointerPosition = stage.getPointerPosition();
});
stage.on("contentMouseup.proto", function() {
  isPaint = false;
});
// and core function - drawing
// stage.on("contentMousemove.proto", function() {
stage.on("contentClick.proto", function() {
  // 基本座標資訊
  var pos = stage.getPointerPosition();
  localPos = {
    x: pos.x - image.x(),
    y: pos.y - image.y()
  };
  context.globalCompositeOperation = "source-over";
  if (tempPos.length > 1) {
    let x0 = tempPos[0].x;
    let y0 = tempPos[0].y;
    console.log(x0, y0);
    let x_square = (x0 - localPos.x) * (x0 - localPos.x);
    let y_square = (y0 - localPos.y) * (y0 - localPos.y);
    let length = Math.sqrt(x_square + y_square);
    if (length < 25) {
      let points = [];
      tempPos.forEach(e => {
        points.push(e.x);
        points.push(e.y);
      });
      var poly = new Konva.Line({
        points: points,
        fill: "#00D2FF",
        stroke: "black",
        strokeWidth: 5,
        closed: true
      });
      // add the shape to the layer
      layer.add(poly);
      stage.add(layer);
      first = true;
    }
  }

  context.beginPath();
  var localPos = {
    x: lastPointerPosition.x - image.x(),
    y: lastPointerPosition.y - image.y()
  };
  if (first) {
    console.log('first')
    context.moveTo(localPos.x, localPos.y);
    first = false;
  } else {
    context.moveTo(lastPos.x, lastPos.y);
  }

  context.lineTo(localPos.x, localPos.y);
  tempPos.push({ x: localPos.x, y: localPos.y });
  context.closePath();
  context.stroke();
  lastPointerPosition = pos;
  lastPos = localPos;
  console.log(tempPos);
  layer.draw();
});
var select = document.getElementById("tool");
select.addEventListener("change", function() {
  mode = select.value;
});
