export class ElectronView{
  constructor(entity){
    this.entity = entity;
  }

  draw(painter){
    painter.drawCircle(this.entity.bounding, 'blue', 'black');
  }
}