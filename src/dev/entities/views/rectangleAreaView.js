import { getColor, BLUE } from '../../general/colors';

export class RectangleAreaView{
  constructor(entity, color = BLUE, opacity = 0.4){
    this.entity = entity;
    this.color = color;
    this.opacity = opacity;
  }

  draw(painter){
    painter.drawRectangle(
      this.entity.bounding, 
      getColor(this.color, this.opacity), 
      getColor(this.color, 0),
      5);
  }
}