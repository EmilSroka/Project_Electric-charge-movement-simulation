import { PositionVector } from '../general/geometrics';

const FONT_FAMILY = 'Arial'

export class Painter{
  constructor(canvas, unitTranslator){
    this.ctx = canvas.getContext('2d');
    this.unitTranslator = unitTranslator;
  }

  setProperties(strokeStyle = "black", fillStyle = "black", lineWidth = 1){
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.fillStyle = fillStyle;
    this.ctx.lineWidth = this.unitTranslator.toCanvasUnit(lineWidth);
  }

  drawRepeatImage(rectangle, img){
    this.ctx.fillStyle = this.ctx.createPattern(img, 'repeat');
    // this.ctx.beginPath();

    const {x, y} = this.unitTranslator.simulationToCanvas(rectangle.topLeftCorner);
    const width = this.unitTranslator.toCanvasUnit(rectangle.width);
    const height = this.unitTranslator.toCanvasUnit(rectangle.height);
    this.ctx.fillRect(x, y, width, height);
  }

  drawArrow(from, to, color = "black", lineWidth = 5) {
    from = this.unitTranslator.simulationToCanvas(from);
    to = this.unitTranslator.simulationToCanvas(to);
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = this.unitTranslator.toCanvasUnit(lineWidth);
    

    const length = 0.4 * PositionVector.fromDifference(to, from).length();
    console.log(length);

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(to.x, to.y);
    this.ctx.lineTo(to.x - length * Math.cos(angle - Math.PI / 6), to.y - length * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(to.x - length * Math.cos(angle + Math.PI / 6), to.y - length * Math.sin(angle + Math.PI / 6));
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawArrowLight(from, to) {
    from = this.unitTranslator.simulationToCanvas(from);
    to = this.unitTranslator.simulationToCanvas(to);
    
    const length = 7.968461100260446;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(to.x, to.y);
    this.ctx.lineTo(to.x - length * Math.cos(angle - Math.PI / 6), to.y - length * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(to.x - length * Math.cos(angle + Math.PI / 6), to.y - length * Math.sin(angle + Math.PI / 6));
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.ctx.fill();
  }
  

  drawRectangle(rectangle, fillColor = "white", strokeColor = "black", lineWidth = 1){
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = this.unitTranslator.toCanvasUnit(lineWidth);
    this.ctx.beginPath();

    const {x, y} = this.unitTranslator.simulationToCanvas(rectangle.topLeftCorner);
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

    const center = this.unitTranslator.simulationToCanvas(circle.center);
    const radius = this.unitTranslator.toCanvasUnit(circle.radius);
    this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, true);
    
    this.ctx.stroke();
    this.ctx.fill();
  }

  writeText(point, content, fontSize, color){
    const realFontSize = this.unitTranslator.toCanvasUnit(fontSize);
    const position = this.unitTranslator.simulationToCanvas(point);

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color;
    this.ctx.font = `normal ${realFontSize}px ${FONT_FAMILY}`;
    this.ctx.fillText(content, position.x, position.y);
  }
}