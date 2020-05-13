import { Rectangle } from "../../general/geometrics";
import { deepCopy } from '../../general/utils';
import { getColor, DARK_BLUE, BLUE} from '../../general/colors';

export class ProtonView{
  constructor(entity, signColor = DARK_BLUE, backgroundColor = BLUE){
    this.entity = entity;
    this.signColor = signColor;
    this.backgroundColor = backgroundColor;
  }

  draw(painter){
    const [ horizontalLine, verticalLine ] = getPlus(this.entity);
    painter.drawCircle(this.entity.bounding, getColor(this.backgroundColor), getColor(this.signColor), 1.5 * horizontalLine.height);
    painter.drawRectangle(horizontalLine, getColor(this.signColor), getColor(this.signColor));
    painter.drawRectangle(verticalLine, getColor(this.signColor), getColor(this.signColor));
  }
}

function getPlus(entity){
  const radius = entity.bounding.radius;
  const horizontal = deepCopy(entity.center).translate(-(radius / 2), radius / 12);
  const vertical = deepCopy(entity.center).translate(-(radius / 12), radius / 2);
  return [
    new Rectangle(horizontal, radius, radius / 6),
    new Rectangle(vertical, radius / 6, radius)
  ];
}