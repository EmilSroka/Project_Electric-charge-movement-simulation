const FONT_FAMILY = 'Arial'

export class Painter{
  constructor(canvas, unitTranslator){
    this.ctx = canvas.getContext('2d');
    this.unitTranslator = unitTranslator;
  }

  drawRectangle(rectangle, fillColor = "white", strokeColor = "black", lineWidth = 1){
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = this.unitTranslator.toCanvasUnit(lineWidth);
    this.ctx.beginPath();

    const {x, y} = this.unitTranslator.translatePoint(rectangle.topLeftCorner)
    const width = this.unitTranslator.toCanvasUnit(rectangle.width);
    const height = this.unitTranslator.toCanvasUnit(rectangle.height);
    this.ctx.rect(x, y, width, height);

    this.ctx.stroke();
    this.ctx.fill();
  }

  drawCircle(circle, fillColor = "white", strokeColor = "black", lineWidth = 1){
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = this.unitTranslator.toCanvasUnit(lineWidth);
    this.ctx.beginPath();

    const center = this.unitTranslator.translatePoint(circle.center);
    const radius = this.unitTranslator.toCanvasUnit(circle.radius);
    this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, true);
    
    this.ctx.stroke();
    this.ctx.fill();
  }

  writeText(bottomLeftPoint, content, fontSize, color){
    const realFontSize = this.unitTranslator.toCanvasUnit(fontSize);
    const position = this.unitTranslator.translatePoint(bottomLeftPoint);

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color;
    this.ctx.font = `normal ${realFontSize}px ${FONT_FAMILY}`;
    this.ctx.fillText(content, position.x, position.y);
  }
}