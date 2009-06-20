canvasWrapper = function(canvas)
{
  this.trueCanvas = true;
  
  this.cnv = canvas;
  this.ctx = canvas.getContext('2d');
  
  this.width = canvas.width;
  this.height = canvas.height;
  
  this.clear = function() {
    this.ctx.clearRect(0, 0, width, height)
  };
  
  this.setStroke = function(w) {
    this.ctx.lineWidth = w;
  }
  
  this.setColor = function(c) {
    this.ctx.strokeStyle = c;
    this.ctx.fillStyle = c;
  }

  this.drawLine = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
    
  this.fillPolygon = function(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x[0], y[0]);
    this.ctx.lineTo(x[1], y[1]);
    this.ctx.lineTo(x[2], y[2]);
    this.ctx.fill();
  }
    
  this.ellipse = function(aX, aY, aWidth, aHeight) {
    //http://webreflection.blogspot.com/2009/01/ellipse-and-circle-for-canvas-2d.html
    var hB = (aWidth / 2) * .5522848,
    vB = (aHeight / 2) * .5522848,
    eX = aX + aWidth,
    eY = aY + aHeight,
    mX = aX + aWidth / 2,
    mY = aY + aHeight / 2;
    this.ctx.moveTo(aX, mY);
    this.ctx.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
    this.ctx.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
    this.ctx.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
    this.ctx.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
    this.ctx.closePath();
  }
  
  this.fillEllipse = function(aX, aY, aWidth, aHeight) {
    this.ctx.beginPath();
    this.ellipse(aX, aY, aWidth, aHeight);
    this.ctx.fill();
  }
  
  this.drawEllipse = function(aX, aY, aWidth, aHeight) {
    this.ctx.beginPath();
    this.ellipse(aX, aY, aWidth, aHeight);
    this.ctx.stroke();
  }
  
  this.paint = function() {}
  
  this.drawStringRect = function(text, x, y, maxWidth, align) {
    this.ctx.font = '12pt Serif'
    this.ctx.textAlign = 'center';
    if (typeof eval(this.ctx.fillText) == 'function')
      this.ctx.fillText(text, x+maxWidth/2, y+12, maxWidth);
  }
}