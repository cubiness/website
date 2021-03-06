
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.slider').slider();
  $('.tooltipped').tooltip({exitDelay: 200});
  $('#ip-button').on('click', function(){
    var el = M.Tooltip.getInstance($('.tooltipped')[0]);
    el.tooltipEl.children[0].innerText = "Copied!";
    copy("mc.cubiness.net");
  });
  $('#discord-button').on('click', function(){
    window.open("https://discord.gg/EJsevTq");
  });

  canvases = $('.button');
  for (var i = 0; i < canvases.length; i++) {
    c = canvases[i];
    ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawButton(ctx, c.width, c.height);
  }
});

function copy(str) {
  el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function drawButton(ctx, w, h) {
  s = 4;                       // w and h for each square
  percent = 0.8;               // percent of canvas that will be button; rest will be fade
  stroke = 1;
  margin = 1;
  data = ctx.getImageData(0, 0, w, h);

  block_height = h / (s + margin) - 1;
  block_width = w / (s + margin) - 1;

  for (var y = 0; y < block_height; y++) {
    for (var x = 0; x < block_width; x++) {
      if (x >= block_width * percent) {
        var amount = (x - block_width * percent) * (1 - percent);
        if (Math.random() > amount) {
          drawSquare(data, x, y, s, margin, stroke);
        }
      } else if (x == 0 || y == 0 || x == block_width * percent - 1 || y >= block_height - 1) {
        drawSquare(data, x, y, s, margin, stroke);
      }
    }
  }

  ctx.putImageData(data, 0, 0);
}

function drawSquare(data, x, y, s, margin, stroke) {
  strokeColor = 200;
  fillColor = 170;
  var color;
  var rowSize = data.width * 4;
  var startIndex = y * (s + margin) * rowSize + x * (s + margin) * 4;
  for (var y1 = 0; y1 < s; y1++) {
    for (var x1 = 0; x1 < s; x1++) {
      if (y1 < stroke || y1 >= s - stroke || x1 < stroke || x1 >= s - stroke) {
        color = strokeColor;
      } else {
        color = fillColor;
      }
      data.data[startIndex + y1 * rowSize + x1 * 4 + 0] = color;
      data.data[startIndex + y1 * rowSize + x1 * 4 + 1] = color;
      data.data[startIndex + y1 * rowSize + x1 * 4 + 2] = color;
      data.data[startIndex + y1 * rowSize + x1 * 4 + 3] = 255;
    }
  }
}
