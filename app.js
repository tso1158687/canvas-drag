// 模擬一開始server下來的資料
var serverData = [
  {
    name: "ajax資料1",
    points: [1737, 166, 1736, 258, 1660, 268, 1688, 150, 1735, 167]
  },
  {
    name: "ajax資料2",
    points: [1253, 134, 1164, 202, 1294, 232, 1256, 136]
  },
  {
    name: "ajax資料3",
    points: [
      559,
      263,
      537,
      233,
      446,
      220,
      403,
      279,
      395,
      349,
      458,
      423,
      572,
      438,
      610,
      401,
      620,
      344,
      564,
      268
    ]
  }
];
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

// 圖形基本設定end
// ajax data start
drawData();

stage.on("contentClick", e => {
  clickPoints.push(e.evt.offsetX);
  clickPoints.push(e.evt.offsetY);
  if (clickPoints.length > 3 && clickPoints.length < 6) {
    drawTempLine();
    console.log("進來這裡吧?");
  } else if (clickPoints.length > 5) {
    let x0 = clickPoints[0];
    let y0 = clickPoints[1];
    console.log(x0, y0);
    let x_square = (x0 - e.evt.offsetX) * (x0 - e.evt.offsetX);
    let y_square = (y0 - e.evt.offsetY) * (y0 - e.evt.offsetY);
    let length = Math.sqrt(x_square + y_square);
    // 距離小於25，點連成線，大於25繼續畫點
    if (length < 25) {
      serverData.push({
        name: "新建資料",
        points: clickPoints
      });
      drawData();
      clickPoints = [];
    } else {
      drawTempLine()
    
    }
  }
});
function drawData() {
  // 清掉所有東西重來 
  layer.destroy();

  serverData.forEach((e, i) => {
    // 圖形基本設定start
    var group = new Konva.Group({
      draggable: true,
      index: i
    });
    var SrvRect = new Konva.Line({
      points: e.points,
      fill: "red",
      stroke: "black",
      strokeWidth: 5,
      closed: true,
      // draggable: true,
      Opacity: 0.6
    });
    var SrvRectText = new Konva.Text({
      x: e.points[0],
      y: e.points[1],
      text: e.name,
      fontSize: 30,
      fontFamily: "Calibri",
      fill: "green"
      // draggable:true
    });
    group.add(SrvRect);
    group.add(SrvRectText);
    layer.add(group);
    group.on("mouseover", function() {
      document.body.style.cursor = "pointer";
    });
    group.on("mouseout", function() {
      document.body.style.cursor = "default";
    });
    stage.add(layer);
    // 拖移事件
    group.on("dragend", function(e) {
      // 紀錄位移脫放資料
      serverData[e.target.attrs.index].drag = {
        x: e.evt.dragEndNode.attrs.x,
        y: e.evt.dragEndNode.attrs.y
      };
      console.log("drag");
    });
  });
}
function drawTempLine() {
  console.log('畫線囉')
  var tempLine = new Konva.Line({
    points: clickPoints,
    stroke: "red",
    strokeWidth: 2,
    lineJoin: "round",
    dash: [33, 10]
  });
  layer.add(tempLine);
  stage.add(layer);
}
stage.add(layer);
