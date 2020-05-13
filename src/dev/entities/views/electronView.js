import { Rectangle } from "../../general/geometrics";
import { deepCopy } from '../../general/utils';
import { getColor, DARK_RED, RED} from '../../general/colors';

export class ElectronView{
  constructor(entity, signColor = DARK_RED, backgroundColor = RED){
    this.entity = entity;
    this.signColor = signColor;
    this.backgroundColor = backgroundColor;
  }

  draw(painter){
    const minus = getMinus(this.entity);
    painter.drawCircle(this.entity.bounding, getColor(this.backgroundColor), getColor(this.signColor), 1.5 * minus.height);
    painter.drawRectangle(minus, getColor(this.signColor), getColor(this.signColor));
  }
}

function getMinus(entity){
  const radius = entity.bounding.radius;
  const topLeftPoint = deepCopy(entity.center).translate(-(radius / 2), radius / 12);
  return new Rectangle(topLeftPoint, radius, radius / 6);
}