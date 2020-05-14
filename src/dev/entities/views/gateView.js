import { getColor, RED} from '../../general/colors';
import { Rectangle } from '../../general/geometrics';

export class GateView{
  constructor(entity, fillImage, borderColor = RED){
    this.entity = entity;
    this.borderColor = borderColor;
    this.fillImage = fillImage;
  }

  draw(painter){
    const { topLeft, topRight } = this.entity.bounding[0].getPoints();
    const { bottomRight } = this.entity.bounding[2].getPoints();
    const width = topLeft.x - bottomRight.x;
    const height = topLeft.y - bottomRight.y;
    painter.drawRepeatImage(new Rectangle(topRight, width, height), this.fillImage);
    painter.drawRectangle(this.entity.bounding[0], getColor(this.borderColor), getColor(this.borderColor));
    painter.drawRectangle(this.entity.bounding[1], getColor(this.borderColor), getColor(this.borderColor));
    painter.drawRectangle(this.entity.bounding[2], getColor(this.borderColor), getColor(this.borderColor));
  }
}