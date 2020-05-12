export class Painter{
  constructor(canvas, unitTranslator){
    this.ctx = canvas.getContext('2d');
    this.unitTranslator = unitTranslator;
  }

  drawCircle(circle, fillColor, strokeColor){
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();

    const center = this.unitTranslator.translatePoint(circle.center);
    const radius = this.unitTranslator.toCanvasUnit(circle.radius);
    this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, true);
    
    this.ctx.stroke();
    this.ctx.fill();
  }
}