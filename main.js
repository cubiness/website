
$(document).ready(function(){
  $('.sidenav').sidenav();

  canvases = $('.button');
  for (var i = 0; i < canvases.length; i++) {
    c = canvases[i];
    ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawButton(ctx, c.width, c.height);
  }
});

function drawButton(ctx, w, h) {
  s = 8;                       // w and h for each square
  percent = 0.8;               // percent of canvas that will be button; rest will be fade
  stroke = 1;

  for (var y = 0; y < h / s; y++) {
    for (var x = 0; x < w / s * percent; x++) {
      drawSquare(ctx, x, y, s, stroke);
    }
  }
}

function drawSquare(ctx, x, y, s, stroke) {
  ctx.strokeStyle = "#aaa";
  ctx.fillStyle = "#888";
  ctx.fillRect(x * s, y * s, s, s);
  ctx.strokeRect(x * s, y * s, s, s);
}
