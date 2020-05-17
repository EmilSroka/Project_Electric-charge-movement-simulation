import { getColor, DARK_GRAY, LIGHT_GRAY } from '../../general/colors';

export class WallView{
  constructor(entity, color = LIGHT_GRAY, borderColor = DARK_GRAY){
    this.entity = entity;
    this.color = color;
    this.borderColor = borderColor;
  }

  draw(painter){
    painter.drawRectangle(this.entity.bounding, getColor(this.color), getColor(this.borderColor), 5);
  }
}