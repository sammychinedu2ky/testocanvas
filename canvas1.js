function $(id) {
  return document.getElementById(id);
}
let ctx = $("canvas1").getContext("2d");
    let ctx2 = $("canvas2").getContext("2d");
let width = Math.floor(Math.random() * 400) + 200;

let x = 300;
let y = 300;
let r = 50;
let startAngle = 0;
let endAngle = 2 * Math.PI;
let circularPath = new Path2D();
circularPath.arc(x, y, r, startAngle, endAngle);

//ctx.drawImage($("source"), 0, 0, $("source").width, $("source").height);
ctx.drawImage($("source"), 0, 0, 600, 600);
ctx.save();
ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
ctx.fillRect(0, 0, 600, 600);
ctx.clip(circularPath);
ctx.drawImage($("source"), 0, 0, 600, 600);
ctx.stroke(circularPath);
createImage();
ctx.restore();

let fromx = x + (r - 25) * Math.cos(Math.PI / 6);
let fromy = y - (r - 25) * Math.sin(Math.PI / 6);
let tox = fromx + 50 * Math.cos(Math.PI / 6);
let toy = fromy - 50 * Math.sin(Math.PI / 6);


let linePath = new Path2D();
ctx.beginPath();
linePath.moveTo(fromx, fromy);

linePath.lineTo(
  fromx + 50 * Math.cos(Math.PI / 6),
  fromy - 50 * Math.sin(Math.PI / 6)
);

drawArrowLine(linePath, fromx, fromy, tox, toy);
drawSecondArrowLine(linePath, fromx, fromy, tox, toy);
ctx.lineWidth=4;
ctx.stroke(linePath);

let mouseDown = false;
let isCirlePath = false;
let isLineStrokePath = false;
$("canvas1").addEventListener("mousemove", (e) => {
  $("canvas1").addEventListener("mousedown", (e) => {
    mouseDown = true;
  });
  $("canvas1").addEventListener("mouseup", (e) => {
    mouseDown = false;
    ctx.strokeStyle = "black";
    ctx.lineWidth=1;
    ctx.stroke(circularPath);
    ctx.restore();
    ctx.lineWidth = 4;
        ctx.stroke(linePath);
        isCirlePath = false;
        isLineStrokePath = false;
  });
  let newDiff = Math.sqrt(
    Math.pow(e.offsetX - x, 2) + Math.pow(e.offsetY - y, 2)
  );
  if(ctx.isPointInStroke(linePath, e.offsetX, e.offsetY) && mouseDown){
    isLineStrokePath = true;
  }
    else if (ctx.isPointInPath(circularPath, e.offsetX, e.offsetY) && mouseDown) {
    isCirlePath = true;
    }
  if (isLineStrokePath && mouseDown) {
    ctx.reset();
    ctx.save();
    createImage();
   // ctx.clearRect(0, 0, $("canvas1").width, $("canvas1").height);

    r = r + (newDiff - r);
    if (r < 50) r = 50;
    circularPath = new Path2D();
    ctx.beginPath();
    ctx.drawImage($("source"), 0, 0, 600, 600);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, 600, 600);
    circularPath.arc(x, y, r, startAngle, endAngle);
    ctx.clip(circularPath);
    ctx.drawImage($("source"), 0, 0, 600, 600);
    ctx.strokeStyle= "black"
    ctx.stroke(circularPath);
    ctx.restore();

    let fromx = x + (r - 25) * Math.cos(Math.PI / 6);
    let fromy = y - (r - 25) * Math.sin(Math.PI / 6);
    let tox = fromx + 50 * Math.cos(Math.PI / 6);
    let toy = fromy - 50 * Math.sin(Math.PI / 6);
    ctx.beginPath();
    ctx.lineWidth = 4;

    linePath = new Path2D();
    linePath.moveTo(fromx, fromy);
    linePath.lineTo(
      fromx + 50 * Math.cos(Math.PI / 6),
      fromy - 50 * Math.sin(Math.PI / 6)
    );
    drawArrowLine(linePath, fromx, fromy, tox, toy);
    drawSecondArrowLine(linePath, fromx, fromy, tox, toy);
    ctx.strokeStyle = "red";
    ctx.stroke(linePath);
    //ctx.restore()
  } else if (
   isCirlePath &&
    mouseDown
  ) {
  createImage();
   ctx.clearRect(0, 0, $("canvas1").width, $("canvas1").height);
   ctx.drawImage($("source"), 0, 0, 600, 600);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    x = x + e.movementX;
    y = y + e.movementY;
    
    
    circularPath = new Path2D();
    circularPath.arc(x, y, r, startAngle, endAngle);
    ctx.beginPath();
    ctx.drawImage($("source"), 0, 0, 600, 600);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, 600, 600);
    ctx.save();
    ctx.clip(circularPath);
    ctx.drawImage($("source"), 0, 0, 600, 600);
    ctx.strokeStyle='red'
    ctx.stroke(circularPath);
    ctx.restore();
    ctx.closePath();
    let fromx = x + (r - 25) * Math.cos(Math.PI / 6);
    let fromy = y - (r - 25) * Math.sin(Math.PI / 6);
    let tox = fromx + 50 * Math.cos(Math.PI / 6);
    let toy = fromy - 50 * Math.sin(Math.PI / 6);
    ctx.beginPath();
    ctx.lineWidth = 4;
    linePath = new Path2D();
    linePath.moveTo(fromx, fromy);
    linePath.lineTo(
      fromx + 50 * Math.cos(Math.PI / 6),
      fromy - 50 * Math.sin(Math.PI / 6)
    );
    drawArrowLine(linePath, fromx, fromy, tox, toy);
    drawSecondArrowLine(linePath, fromx, fromy, tox, toy);
    ctx.strokeStyle = "red";
    ctx.stroke(linePath);
  }
});

function drawArrowLine(ctx, fromx, fromy, tox, toy) {
  let dx = tox - fromx;
  let dy = toy - fromy;
  let angle = Math.atan2(dy, dx);
  let arrowLength = 10;
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - arrowLength * Math.cos(angle - Math.PI / 6),
    toy - arrowLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - arrowLength * Math.cos(angle + Math.PI / 6),
    toy - arrowLength * Math.sin(angle + Math.PI / 6)
  );
}

//ctx.stroke();
function drawSecondArrowLine(ctx, fromx, fromy, tox, toy) {
  let dx = fromx - tox;
  let dy = fromy - toy;
  let angle = Math.atan2(dy, dx);
  let arrowLength = 10;
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(
    fromx - arrowLength * Math.cos(angle - Math.PI / 6),
    fromy - arrowLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(
    fromx - arrowLength * Math.cos(angle + Math.PI / 6),
    fromy - arrowLength * Math.sin(angle + Math.PI / 6)
  );
}


function createImage(){
    ctx2.reset();
    ctx2.save();
    ctx2.arc(x, y, r, startAngle, endAngle);
    ctx2.clip();
    ctx2.drawImage($("source"), 0, 0, 600, 600);
    ctx2.restore();
    let data = $("canvas2").toDataURL();
    $("img-frame").src = data;
    let image = ctx2.getImageData(x-r, y-r, 600, 600);
}   
