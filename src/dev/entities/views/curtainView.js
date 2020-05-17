import { getColor, GRAY, BLACK } from '../../general/colors';

export class CurtainView{
  constructor(entity, text, textColor = BLACK, fontSize = 48, color = GRAY, opacity = 0.2){
    this.entity = entity;
    this.textColor = textColor;
    this.color = color;
    this.opacity = opacity;
    this.text = text;
    this.fontSize = fontSize;
  }

  draw(painter){
    painter.writeText(this.entity.center, this.text, this.fontSize, getColor(this.textColor));
    painter.drawRectangle(
      this.entity.bounding, 
      getColor(this.color, this.opacity), 
      getColor(this.color),
      5);
  }
}