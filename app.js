// 模擬一開始server下來的資料
var serverData=[
    {
        name:'a1',
        points:[1737, 166, 1736, 258, 1660, 268, 1688, 150, 1735, 167]
    },{
        name:'a2',
        points:[1253, 134, 1164, 202, 1294, 232, 1256, 136]
    },{
        name:'a3',
        points:[559, 263, 537, 233, 446, 220, 403, 279, 395, 349, 458, 423, 572, 438, 610, 401, 620, 344, 564, 268]
    }
]
// console.log(serverData)
// serverData.forEach(e=>{
//     console.log(e)
// })
// server end
var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height
});
var movePoint = {
  x: 0,
  y: 0
};
var clickPoints = [];
var rectPonits = [];
var layer = new Konva.Layer();
// ajax data start
serverData.forEach((e,i)=>{
    var rect = new Konva.Line({
        points:e.points,
        fill: "red",
        stroke: "black",
        strokeWidth: 5,
        closed: true,
        draggable: true,
    });
    var rectText = new Konva.Text({
        x: e.points[0],
        y: e.points[1],
        text: e.name,
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green',
        draggable:true
      });
    layer.add(rect);
    layer.add(rectText)
    stage.add(layer);
})
// ajax data end
// dashed line
var tempLine = new Konva.Line({
  points: clickPoints,
  stroke: "red",
  strokeWidth: 2,
  lineJoin: "round",
  dash: [33, 10]
});
var rect = new Konva.Line({
//   points: rectPonits[0],
  points:clickPoints,
  fill: "red",
  stroke: "black",
  strokeWidth: 5,
  closed: true,
  draggable: true
});
stage.on("contentClick", e => {
  clickPoints.push(e.evt.offsetX);
  clickPoints.push(e.evt.offsetY);
  //   console.log(clickPoints);
  if (clickPoints.length > 3 && clickPoints.length < 6) {
    layer.add(tempLine);
    stage.add(layer);
  } else if (clickPoints.length > 5) {
    let x0 = clickPoints[0];
    let y0 = clickPoints[1];
    console.log(x0, y0);
    let x_square = (x0 - e.evt.offsetX) * (x0 - e.evt.offsetX);
    let y_square = (y0 - e.evt.offsetY) * (y0 - e.evt.offsetY);
    let length = Math.sqrt(x_square + y_square);
    // 距離小於25，點連成線，大於25繼續畫點
    if (length < 25) {
        console.log('asd')
    //   rectPonits.push(clickPoints);
    //   console.log(rectPonits)
    //   clickPoints=[]
        console.log(clickPoints)
      layer.add(rect);
    //   layer.add(tempLine)
      stage.add(layer);
    } else {
      layer.add(tempLine);
      stage.add(layer);
    }
    // console.log("要算距離囉");
  }
});
// let x0 = tempPos[0].x;
// let y0 = tempPos[0].y;
// console.log(x0, y0);
// let x_square = (x0 - localPos.x) * (x0 - localPos.x);
// let y_square = (y0 - localPos.y) * (y0 - localPos.y);
// let length = Math.sqrt(x_square + y_square);
// var mouseMovePoint = new Konva.Circle({
//   x: movePoint.x,
//   y: movePoint.y,
//   radius: 20,
//   fill: "red",
//   stroke: "black",
//   strokeWidth: 4
// });

// 偵測滑鼠移動事件，想做一個隨滑鼠移動的點點
// 好奇怪，先放棄QQ
// stage.on("contentMousemove", e => {
//     movePoint.x = e.evt.offsetX;
//     movePoint.y = e.evt.offsetY;
// //   console.log(mouseMovePoint);
//   layer.add(mouseMovePoint);
//   stage.add(layer);
//   console.log("mousemove");
// });
/*
     * since each line has the same point array, we can
     * adjust the position of each one using the
     * move() method
     */

// greenLine.move({
//   x: 0,
//   y: 55
// });
// layer.add(greenLine);
// add the layer to the stage
stage.add(layer);
