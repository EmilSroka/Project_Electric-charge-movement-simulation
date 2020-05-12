export class ProtonView{
  constructor(entity){
    this.entity = entity;
  }

  draw(painter){
    painter.drawCircle(this.entity.bounding, 'red', 'black');
  }
}