function $(id) {
  return document.getElementById(id);
}
let ctx = $("canvas1").getContext("2d");

let x = 100;
let y = 100;
let r = 50;
let startAngle = 0;
let endAngle = 2 * Math.PI;
//ctx.arc(x, y, r, startAngle, endAngle);
let reg = new Path2D();
ctx.arc(x, y, r, startAngle, endAngle);
ctx.stroke();
let fromx = x + 25 * Math.cos(Math.PI / 6);
let fromy = y - 25 * Math.sin(Math.PI / 6);
let tox = fromx + 50 * Math.cos(Math.PI / 6);
let toy = fromy - 50 * Math.sin(Math.PI / 6);

ctx.moveTo(fromx, fromy);
ctx.lineTo(
  fromx + 50 * Math.cos(Math.PI / 6),
  fromy - 50 * Math.sin(Math.PI / 6)
);
ctx.stroke();
drawArrowLine(fromx, fromy, tox, toy);
drawSecondArrowLine(fromx, fromy, tox, toy);
//ctx.stroke(reg);
//ctx.fill()
function drawArrowLine(fromx, fromy, tox, toy) {
  ctx.beginPath();
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
  ctx.stroke();
}

//ctx.stroke();
function drawSecondArrowLine(fromx, fromy, tox, toy) {
  ctx.beginPath();
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
  ctx.stroke();
}
