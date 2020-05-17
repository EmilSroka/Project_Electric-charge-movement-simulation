import { getColor } from '../../general/colors';

export class CurtainView{
  constructor(entity, text, textColor, fontSize, color, opacity){
    this.entity = entity;
    this.textColor = textColor;
    this.color = color;
    this.opacity = opacity;
    this.text = text;
    this.fontSize = fontSize;
  }

  draw(painter){ 
    painter.drawRectangle(
      this.entity.bounding, 
      getColor(this.color, this.opacity), 
      getColor(this.color),
      5
    );
    painter.writeText(this.entity.center, this.text, this.fontSize, getColor(this.textColor));
  }
}